import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import LabelStudio from 'label-studio';
import { event } from 'jquery';
import { NgxSpinnerService } from 'ngx-bootstrap-spinner';

@Component({
  selector: 'app-evaluate-xray',
  templateUrl: './evaluate-xray.component.html',
  styleUrls: ['./evaluate-xray.component.scss']
})
export class EvaluateXrayComponent {
  markData: any;
  // is equal to default value of input range
  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private spinner: NgxSpinnerService) {

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

  onRangeChange(event: any) {
    this.valInput = (<HTMLInputElement>event.target).value.trim();
    this.leftPos = `${+(<HTMLInputElement>event.target).value.trim() - 5}%`
  }

 ngOnInit() {
 
 
 
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
       fetch(this.xRayData[0]?.xray_image.path)
      .then(result => console.log(result.url))
      //console.log(a)
       this.defaultApi(this.xRayData[0]?.xray_image.path, this.xRayData[0]?.xray_image.mimetype) 
       this.createLabelStudio()
      
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

 async defaultApi(path,type) {
  this.spinner.show();
  this.userService.getEvalById(this.id).subscribe((res: any) => {
    console.log(res)
    if(!res.success){
      const  image_data={
        img_path:path,
        img_type:type,
        xray_id:this.id
      }
      this.userService.loadAIData(image_data).subscribe((res: any) => {
         console.log("api",res,image_data)
       if (res.success) {
         
         console.log("API called succefully",res.getData)}
       else{ this.spinner.hide();
         console.log("not called",res)
       }})
       setTimeout( ()=>{this.getMarks()
         this.spinner.hide();
       },2000)
    }
    else{
      if (res.success) {
        this.markData = res.getData;
        setTimeout( ()=>{
          this.spinner.hide();
        },2000)
        console.log(this.markData.ai_identified_cavities.rectangle_coordinates[0][2],"record found")
        
        this.createLabelStudio1()
      }
    }
  })
   
     
  }

  getMarks()
  {
    this.userService.getEvalById(this.id).subscribe((res: any) => {
      console.log(res)
      if (res.success) {
        this.markData = res.getData;
        console.log(this.markData.ai_identified_cavities.rectangle_coordinates[0][2])
        //this.userMark = this.markData.dentist_correction
        //console.log(this.userMark, "***")
        this.markData.ai_identified_cavities.rectangle_coordinates.map((element: any) => {
          console.log(element[0],element[1],this.markData.ai_identified_cavities.color_labels[1])
         
        })
        this.createLabelStudio1()
      }
      else {
        console.log("error")
      }
    })
  }

  //label-studio
  createLabelStudio1() {
  
 
    const resultArr = this.markData.ai_identified_cavities.rectangle_coordinates.map((element: any) => {
      let obj = {
        "from_name": "label",
        "id": Math.random(),
        "type": "rectanglelabels",
        "source": "$image",
        // "original_width":this.userMark[1]?.original_height,
        "original_width": "",
        "original_height": "",
        "image_rotation": 0,
        "to_name": "img",
       
        "fillColor": "#00ff00",
        "background":"red",
        "value":
       { 
        "x": element[0],
        "y": element[1],
        "width": element[2],
        "height": element[3],
        "rotation": 0,
        "rectanglelabels": [
            "Add Mark"
        ]
    }
      }

     console.log(obj)
      return obj;
      // return element.original_width
    })
    this.labelStudio = new LabelStudio('label-studio1',


      {
        config: `
  <View style="display:row; flex-direction: column;">
  <Style> .Controls_wrapper__1Zdbo { display:none; }</Style>
  <Style>.Segment_block__1fyeG {background:transparent !important; border:none; margin-right:0px !important}</Style>
  <Style> .Hint_main__1Svrz { display:none; }</Style>
  <Style>#label-studio1 .ant-tag {color:white !important; font-weight:bold !important;border:none !important; visibility:hidden;}</Style>
 <View style="flex: 90%;  
 margin-top: -14px;">
 <Style> .ImageView_container__AOBmH img {  height:354px !important }</Style>
 <Image name="img" value="$image" width="100%" height="100%"></Image>
 <Style> canvas { width:594px; height:354px !important; color:green }</Style>
 </View>
 <View style="flex: 10%;float:right">
 <RectangleLabels name="label" toName="img" background="red">
 <Label value="Add Mark" background="#8b0000" />
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
          annotations:[],
          predictions:[{
            result:resultArr
           
          }],
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
    this.labelStudio = new LabelStudio('label-studio', {
      config: `
  <View style="display:row; flex-direction: column;">
  <Style> .Controls_wrapper__1Zdbo { display:none; }</Style>
  <Style>.Segment_block__1fyeG {background:transparent !important; border:none; margin-right:0px !important}</Style>
  <Style> .Hint_main__1Svrz { display:none; }</Style>
  <Style>.ant-tag {background-color:#02d959 !important; color:white !important; font-weight:bold !important;border:none !important}</Style>
 <View style="flex: 90%;
 margin-top: -14px;">
 <Style> .ImageView_container__AOBmH img {  height:354px !important }</Style>
 <Image name="img" value="$image" width="100%" height="100%"></Image>
 <Style> canvas { width:594px; height:354px !important }</Style>
 </View>
 <View style="flex: 10%;float:right">
 
 <RectangleLabels name="tag" toName="img" background="green">
 <Label value="Add Mark" background="green" />
 </RectangleLabels>
 </View>
 </View>
 `,

      interfaces: [
        // "panel",
        "update",
        "submit",
        "controls",
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





        this.marker = annotation.serializeAnnotation().map(({ id,original_height,original_width,
          value }) => ({ id,original_height,original_width, value }))
       console.log(this.marker[0].id)
      // localStorage.setItem('markInfo', ['markInfo']);
        localStorage.setItem('markInfo', JSON.stringify(this.marker));

        console.log(annotation.serializeAnnotation(),"original");

        return annotation.serializeAnnotation();
      },
      onUpdateAnnotation: async function (LS, annotation) {
        console.log(annotation.serializeAnnotation());

      }


    });

    console.log(this.labelStudio)
    return this.labelStudio;

  }


  //



  save() {
    /*Swal.fire({
      title: "",
      html: '<span> Accuracy    &nbsp<input type="range" min="0" max="100" value="50" style="width:50%;margin-left:0.5rem"></span><br>' +
        '<br><span class="mt-2">Tag  &nbsp &nbsp &nbsp &nbsp &nbsp<input type="text" style="width:52%;margin-left:0.5rem"></span>',
      confirmButtonText: "Save",
      confirmButtonColor: '#321FDB',
    });*/
    (<HTMLElement>document.getElementsByClassName('ls-submit-btn')[0]).click()
   console.log( this.labelStudio.onSubmitAnnotation,"***")
   console.log(this.marker)

  }
  addMarker(event: MouseEvent) {
    const position = {
      x: event.offsetX,
      y: event.offsetY
    };
    this.marker.push(position);
    console.log(this.marker, "---")


  }
  saveMarks() {
    console.log(this.annotations)

   var markInfo = JSON.parse(localStorage.getItem('markInfo') || '[]');
  console.log(markInfo)
    const xray_info = {
      xray_id: this.id,
      user_id: this.xRayData[0]?.user_id,
      marker: markInfo,
      accuracy_per: this.valInput,

    }
    console.log(xray_info)
    this.userService.addEvalData(xray_info).subscribe((res: any) => {
        if (res.success) {
          Swal.fire({
            text: res.message,
            icon: 'success',
          });
          document.getElementById('close')?.click();
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
