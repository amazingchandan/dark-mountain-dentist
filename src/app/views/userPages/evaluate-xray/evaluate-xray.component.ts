import { Component } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import LabelStudio from 'label-studio';
import { event } from 'jquery';
import { NgxSpinnerService } from 'ngx-bootstrap-spinner';
import { NgxImageZoomModule } from 'ngx-image-zoom';


@Component({
  selector: 'app-evaluate-xray',
  templateUrl: './evaluate-xray.component.html',
  styleUrls: ['./evaluate-xray.component.scss']
})
export class EvaluateXrayComponent {
  markData: any;
  myThumbnail: string;
  myFullresImage: string;
  // is equal to default value of input range
  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private router: Router,) {

  }

  valInput = '25';
  leftPos = `25%`;
  marker: any;
  xRayData: any = [];
  userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  baseLink: string = environment.API_HOST;
  id: any;
  labelStudio: any;
  marks_array: any = [];
  annotations: any;
  totalAI:number=0;
  cavity:any;
  onRangeChange(event: any) {
    this.valInput = (<HTMLInputElement>event.target).value.trim();
    this.leftPos = `${+(<HTMLInputElement>event.target).value.trim() - 5}%`
  }
  

  ngOnInit() {
   
   this.cavity=document.getElementById("cavity")
   this.cavity.style.display="none";

    this.id = this.route.snapshot.paramMap.get('xray_id');

    this.getXray(this.id);

    /* setTimeout(() => {
      
       this.createLabelStudio()
     }, 1000);*/
    //this.createLabelStudio();
  }
  getXray(id) {

    this.userService.getXray(id).subscribe((res: any) => {
      if (res.success) {
        this.xRayData = res.getData;
        console.log(this.xRayData[0]?.xray_image)
      //  fetch(this.xRayData[0]?.xray_image.path)
       //   .then(result => console.log(result.url))
        //console.log(a)
        this.myThumbnail= this.baseLink + this.xRayData[0]?.xray_image.path;
  this.myFullresImage= this.baseLink + this.xRayData[0]?.xray_image.path;
        this.defaultApi(this.xRayData[0]?.xray_image.path, this.xRayData[0]?.xray_image.mimetype)
        this.createLabelStudio1()

      }
      else {
        return res.messages;
      }
    })
  }

  /*async getImageFileFromUrl(url,type){
    let response = await fetch(url);
    let data = await response.blob();
    let metadata = {
      type: type
    };
    return new File([data], "result.jpg", metadata);
  }


 async defaultApi(){
    var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer my-secret-auth-token");
myHeaders.append('Access-Control-Allow-Origin', "*");
myHeaders.append('Access-Control-Allow-Headers', "*");
myHeaders.append('Access-Control-Allow-Origin', 'http://localhost:4200');


const file = await this.getImageFileFromUrl(this.xRayData[0]?.xray_image.path, this.xRayData[0]?.xray_image.mimeType);
console.log(file,"fileObj")
var formdata = new FormData();
formdata.append("image", file);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch("https://admin-scm.blahworks.tech/upload/image", {
  method: 'POST',

  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
})
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  }*/

  async defaultApi(path, type) {
    this.spinner.show();
    this.userService.getEvalById(this.id).subscribe((res: any) => {
      console.log(res)
      if (!res.success) {
        console.log("false")
        const image_data = {
          img_path: path,
          img_type: type,
          xray_id: this.id
        }
        this.userService.loadAIData(image_data).subscribe((res: any) => {
          console.log("api", res, image_data)
          if (res.success) {

            console.log("API called succefully", res.getData)
            setTimeout(() => {
              this.getMarks()
              this.spinner.hide();
            }, 2000)
          }
          else {
            this.spinner.hide();
            console.log("not called", res)
          }
        })
        
      }
      else {
        if (res.success) {
          this.markData = res.getData;
          setTimeout(() => {
            this.spinner.hide();
          }, 2000)
         // console.log(this.markData.ai_identified_cavities.rectangle_coordinates[0].coordinates[1], "record found")
          this.totalAI=this.markData.ai_identified_cavities.rectangle_coordinates.length;
          this.cavity.style.display="block";
          var obj=this.markData.ai_identified_cavities
          const entries = Object.entries(obj);
          const resultArr = this.markData.ai_identified_cavities.rectangle_coordinates.map((element: any,index: any) => {
            console.log(this.markData.ai_identified_cavities.color_labels[index],"/**/")
            })
          console.log(entries,"new obj")
          this.createLabelStudio()
        }
      }
    })


  }

  getMarks() {
    this.userService.getEvalById(this.id).subscribe((res: any) => {
      console.log(res)
      if (res.success) {
        this.markData = res.getData;
        console.log(this.markData.ai_identified_cavities.rectangle_coordinates[0].coordinates[2])
        //this.userMark = this.markData.dentist_correction
        //console.log(this.userMark, "***")
        var obj=this.markData.ai_identified_cavities
        const entries = Object.keys(obj).map((key) => [
          key,
          obj[key],
        ]);
        const resultArr = this.markData.ai_identified_cavities.rectangle_coordinates.map((element: any,index: any) => {
        console.log(this.markData.ai_identified_cavities.color_labels[index],"/**/")
        })
        console.log(entries,"new obj")
        this.totalAI=this.markData.ai_identified_cavities.rectangle_coordinates.length
        this.cavity.style.display="block";
        this.createLabelStudio()
      }
      else {
        console.log("error")
      }
    })
  }

  //label-studio
  createLabelStudio1() {


    
    this.labelStudio = new LabelStudio('label-studio1',


      {
        config: `
        <View style="display:row; flex-direction: column;">
        <Style> .Controls_wrapper__1Zdbo { display:none; }</Style>
        <Style>.Segment_block__1fyeG {background:transparent !important; border:none; margin-right:0px !important}</Style>
        <Style> .Hint_main__1Svrz { display:none; }</Style>
        <Style>.ant-tag {background-color:#02d959 !important; color:white !important; font-weight:bold !important;border:none !important}</Style>
       <View style="flex: 90%;
       margin-top: -14px;">
       <Style> .ImageView_container__AOBmH img {  height:354px !important }
       .ImageView_block__3BAO- {margin-left:-49px}</Style>
       <Image name="img" value="$image" width="100%" height="100%" ></Image>
       <Style> canvas { width:594px; height:354px !important }</Style>
       </View>
 <View style="flex: 10%;float:right">
 <RectangleLabels name="label" toName="img" background="red">
 <!--<Label value="Add Mark" background="#8b0000" />-->
 </RectangleLabels>
 </View>
 </View>
 `,

        interfaces: [
          // "panel",
          //"update",
          // "submit",
          // "controls",
          /*"side-column",
          "annotations:menu",
          "annotations:add-new",
          "annotations:delete",
          "predictions:menu",*/
        ],

        /* user: {
           pk: 1,
           firstName: "James",
           lastName: "Dean"
         },*/

        task: {
          annotations: [],
          predictions: [],
          // id: 1,
          data: {
            image: this.baseLink + this.xRayData[0]?.xray_image.path
          }

        },

        onLabelStudioLoad: function (LS: { annotationStore: { addAnnotation: (arg0: { userGenerate: boolean; }) => any; selectAnnotation: (arg0: any) => void; }; }) {
          var c = LS.annotationStore.addAnnotation({
            userGenerate: true
          });

          LS.annotationStore.selectAnnotation(c.id);
        },
        onSubmitAnnotation: async function (LS, annotation) {
          console.log(annotation.serializeAnnotation());


        },
        onUpdateAnnotation: async function (LS, annotation) {
          console.log(annotation.serializeAnnotation());

        }


      });


    return this.labelStudio;

  }

  createLabelStudio() {
    const resultArr = this.markData.ai_identified_cavities.rectangle_coordinates.map((element: any,index:any) => {
      let obj = {
        "from_name": "label",
        "id":element._id,
        "type": "rectanglelabels",
        "source": "$image",
       
        // "original_width":this.userMark[1]?.original_height,
        "original_width": "",
        "original_height": "",
        "image_rotation": 0,
        "to_name": "img",

        "fillColor": "#00ff00",
        "background": "red",
        "value":
        {
          "x": element.coordinates[0]*100.00/480,
          "y": element.coordinates[1]*100.00/480,
          "width": (element.coordinates[2]-element.coordinates[0])*100.0/480,
          "height":(element.coordinates[3]-element.coordinates[1])*100.0/480,
          "rotation": 0,
          "rectanglelabels": [
            this.markData.ai_identified_cavities.color_labels[index].toString()
          ]
        }
      }

      console.log(obj)
      return obj;
      // return element.original_width
    })
    this.labelStudio = new LabelStudio('label-studio', {
      config: `
      <View style="display:row; flex-direction: column;">
      <Style> .Controls_wrapper__1Zdbo { display:none; }</Style>
      <Style>.Segment_block__1fyeG {background:transparent !important; border:none; margin-right:0px !important}</Style>
      <Style> .Hint_main__1Svrz { display:none; }</Style>
      <Style>#label-studio .ant-tag {background-color:#02d959 !important;color:white !important; font-weight:bold !important;border:none !important; position: relative;
        top: 0px; padding: 10px 14px; border-radius:4px}</Style>
     <Style> .App_menu__X-A5N{visibility:hidden}
     .Entities_treelabels__1eXl8{height:20px;overflow-y:hidden}
     .Entity_row__3Ii1C {display:none}</Style>
     <Style> .ls-common {height:354px !important}</Style>
      <View style="flex: 90%;  
     margin-top: -14px; width:566px">
     <Style> .ImageView_container__AOBmH img {  height:354px !important; width:566px }</Style>
     <Image name="img" value="$image" width="100%" height="100%"></Image>
     <Style> canvas { width:566px ; height:354px !important;  }</Style>
     </View>
 <View style="float:right;visibility:hidden">
 <RectangleLabels name="label" toName="img" background="red" opacity="0.5" strokeWidth="6">
 <Label value="1" background="#FF3131" />
 <Label value="2" background="#FFFF00" />
 </RectangleLabels>

 </View>
 <View style="flex: 10%;position: absolute;left: -28%;
 margin-top: 78px;">
 <RectangleLabels name="label1" toName="img" background="red" opacity="0.5" strokeWidth="8">
 <Label value="Dentist Mark" background="green" />
 </RectangleLabels>
 </View>
 </View>
 `,

      interfaces: [
        // "panel",
        "update",
        "submit",
        "controls",
        "side-column",
       // "annotations:menu",
       // "annotations:add-new",
       // "annotations:delete",
        //"predictions:menu",*/
      ],

      /* user: {
         pk: 1,
         firstName: "James",
         lastName: "Dean"
       },*/

      task: {
        annotations: [{
          result: resultArr
        }],
        predictions: [],
        // id: 1,
        data: {
          image: this.baseLink + this.xRayData[0]?.xray_image.path
        }

      },

      onLabelStudioLoad: function (LS: { annotationStore: { addAnnotation: (arg0: { userGenerate: boolean; }) => any; selectAnnotation: (arg0: any) => void; }; }) {
        var c = LS.annotationStore.addAnnotation({
          userGenerate: true
        });
        LS.annotationStore.selectAnnotation(c.id);
      },
      onSubmitAnnotation: async function (LS, annotation) {
        console.log(annotation.serializeAnnotation(), "original");

        return annotation.serializeAnnotation();
      },
      onDeleteAnnotation: async function(LS, annotation) {
        console.log("delete btn")
        console.log(annotation.serializeAnnotation())
      },

      onUpdateAnnotation: async function (LS, annotation) {
        this.marker = annotation.serializeAnnotation().map(({ id, original_height, original_width,
          value }) => ({ id, original_height, original_width, value }))
        console.log(this.marker[0].id)
        // localStorage.setItem('markInfo', ['markInfo']);
        localStorage.setItem('markInfo', JSON.stringify(this.marker))
        console.log(annotation.serializeAnnotation());

      }


    });

    console.log(this.labelStudio)
    return this.labelStudio;

  }


  //
zoom(e){
  console.log("zoom function")

  $('.ImageView_block__3BAO- .anticon-zoom-in').trigger("click");
  $('.ImageView_block__3BAO- .anticon-drag').trigger("click");
}
zoomOut(e){
  console.log("zoom out function")

  $('.ImageView_block__3BAO- .anticon-zoom-out').trigger("click");
}

/*  save() {
    
    (<HTMLElement>document.getElementsByClassName('ls-update-btn')[0]).click()
    console.log(this.labelStudio.onSubmitAnnotation, "***")
    console.log(this.marker)

  }*/
  delete() {
    console.log("delete function")

    $('.Entity_button__3c64R .anticon-delete').trigger("click");
  }
 
  saveMarks() {
    (<HTMLElement>document.getElementsByClassName('ls-update-btn')[0]).click()
    console.log(this.labelStudio.onSubmitAnnotation, "***")
    console.log(this.marker)

    console.log(this.annotations)

    var markInfo = JSON.parse(localStorage.getItem('markInfo') || '[]');
    console.log(markInfo)
    const markInfo1 = markInfo.filter((elem) => {
      return this.markData.ai_identified_cavities.rectangle_coordinates.every((ele) => {
      return elem.id !== ele._id;
        });
      });
      const AiMarks= this.markData.ai_identified_cavities.rectangle_coordinates.filter((elem) => {
        return markInfo.some((ele) => {
        return elem._id === ele.id;
          });
        });
 console.log(markInfo1,AiMarks)
    const xray_info = {
      xray_id: this.id,
      user_id: this.xRayData[0]?.user_id,
      marker: markInfo,
      total_cavities:markInfo.length
     

    }
    // const ai_info={
    //   xray_id:this.id,
    //   ai_cavities:AiMarks
    // }
    // this.userService.updateAIData(ai_info).subscribe((res: any)=>{
    //   if(res.success)
    //   {
    //     console.log("Ai updated")
    //   }
    //   else{
    //     console.log("Ai not updated")
    //   }
    // })

        console.log(xray_info)
    this.userService.addEvalData(xray_info).subscribe((res: any) => {
      if (res.success) {
        Swal.fire({
          text: res.message,
          icon: 'success',
        });
        document.getElementById('close')?.click();
        this.router.navigateByUrl('/upload-xray/0');
      } else {
        Swal.fire({
          text: res.message,
          icon: 'error',
        });

      }

    })
    localStorage.removeItem('markInfo')
  }
  renderImage(img: string) {
    if (img) {
      return this.baseLink + img;
    } else {
      return '../assets/images/no-image.jpg';
    }
  }
  handleClick() {
    this.router.navigateByUrl('/upload-xray/0');
  }
  refresh(){
    window.location.reload();
  }
}

/*
 "result":this.userMark.map((element:any) => { [
          {
              "from_name": "tag",
              "id": "Dx_aB91ISN",

              "source": "$image",
              // "original_width":this.userMark[1]?.original_height,
              "original_width":element?.original_width,
               "original_height": element?.original_height,
              "image_rotation": 0,
              "to_name": "img",
              "type": "ellipselabels",
              "value": {

                "height": 10.458911419423693,
                "ellipselabels": [
                  "Add Mark"
                ],
               "radiusX":element?.value.radiusX,
               "radiusY":element?.value.radiusY,
                "rotation": 0,

                "x":element?.value.x,
                "y":element?.value.y
              }
          }
      ]}),
 */
