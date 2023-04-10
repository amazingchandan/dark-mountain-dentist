import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import LabelStudio from 'label-studio';
import { NgxSpinnerService } from 'ngx-bootstrap-spinner';

@Component({
  selector: 'app-mark-xray',
  templateUrl: './mark-xray.component.html',
  styleUrls: ['./mark-xray.component.scss']
})
export class MarkXrayComponent {
  xRayData: any = [];
  id: string;
  markData: any = [];
  userMark: any;
  labelStudio: any;
  AIMarkData: any=[];
  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private spinner: NgxSpinnerService) {

  }


  // is equal to default value of input range
  valInput = '25';
  leftPos = `25%`;
  marker: any = [];
  baseLink: string = environment.API_HOST;
  userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');



  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('xray_id');
    this.spinner.show();
    this.getXray(this.id);
    this.getMark(this.id);
  /*  setTimeout(() => {
      this.createLabelStudio()
    }, 1000);*/
 
  }
  onRangeChange(event: any) {
    this.valInput = (<HTMLInputElement>event.target).value.trim();
    this.leftPos = `${+(<HTMLInputElement>event.target).value.trim() - 5}%`
    console.log(this.valInput, this.leftPos)
  }

  getXray(id) {
    this.userService.getXray(id).subscribe((res: any) => {
      if (res.success) {
        this.xRayData = res.getData;
        console.log(this.xRayData[0]?.xray_image.path)
       
      }
      else {
        return res.messages;
      }
    })
  }

  getMark(id) {

    this.userService.getEvalById(id).subscribe((res: any) => {
      if (res.success) {
        this.markData = res.getData;
        console.log(this.markData)
        this.userMark = this.markData.dentist_correction
        this.AIMarkData = this.markData.ai_identified_cavities;
        console.log(this.userMark, "***",this.AIMarkData)
        this.createLabelStudio()
        this.createLabelStudio1()
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
      }
      else {
        console.log("error")
      }
    })
  }

  //label-studio

  createLabelStudio() {
    var userMark1 = this.userMark;
         const resultArrUser = this.userMark.map((element: any) => {
      let obj = {
        "from_name": "label",
        "id": element.id,
        "type": "rectanglelabels",
        "source": "$image",
        // "original_width":this.userMark[1]?.original_height,
        "original_width": element.original_width,
        "original_height": element.original_height,
        "image_rotation": 0,
        "to_name": "img",
       
        "fillColor": "#00ff00",
        "background":"green",
        "value":
       { 
        "x": element.value.x,
        "y": element.value.y,
        "width": element.value.width,
        "height": element.value.height,
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

   //AI MArking
   const resultArrAI =  this.AIMarkData.rectangle_coordinates.map((element: any) => {
    let obj = {
      "from_name": "label1",
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
          "AI Mark"
      ]
  }
    }

  console.log(obj)
    return obj;
    // return element.original_width
  })
 const resultArr = resultArrUser.concat(resultArrAI)
    this.labelStudio = new LabelStudio('label-studio',


      {
        config: `
  <View style="display:row; flex-direction: column;">
  <Style> .Controls_wrapper__1Zdbo { display:none; }</Style>
  <Style>.Segment_block__1fyeG {background:transparent !important; border:none; margin-right:0px !important}</Style>
  <Style> .Hint_main__1Svrz { display:none; }</Style>
  <Style>#label-studio .ant-tag {color:white !important; font-weight:bold !important;border:none !important; visibility:hidden;}</Style>
 <View style="flex: 90%;  
 margin-top: -14px;">
 <Style> .ImageView_container__AOBmH img {  height:354px !important }</Style>
 <Image name="img" value="$image" width="100%" height="100%"></Image>
 <Style> canvas { width:594px; height:354px !important; color:green }</Style>
 </View>
 <View style="flex: 10%;float:right">
 <RectangleLabels name="label" toName="img" background="green">
 <Label value="Add Mark" background="green" />

 </RectangleLabels>
 <RectangleLabels name="label1" toName="img" >
 
 <Label value="AI Mark" background="red" />
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
            result:
              resultArr
        }
      ],
          
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




  //
  createLabelStudio1() {
    this.labelStudio = new LabelStudio('label-studio1', {
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
 <RectangleLabels name="tag" toName="img">
 <Label value="Add Mark" background="blue"></Label>
<!--<Label value="Add Mark1" style=""></Label>-->

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
        annotations: [ ],
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





          this.marker = annotation.serializeAnnotation().map(({ id, original_height, original_width,
            value }) => ({ id, original_height, original_width, value }))
          console.log(this.marker[0].id)
          // localStorage.setItem('markInfo', ['markInfo']);
          localStorage.setItem('markInfo', JSON.stringify(this.marker));

          console.log(annotation.serializeAnnotation());

          return annotation.serializeAnnotation();
        },
        onUpdateAnnotation: async function (LS, annotation) {
          console.log(annotation.serializeAnnotation());

        }


      });

    console.log(this.labelStudio)
    return this.labelStudio;

  }






  save() {
    /* Swal.fire({
       title: "",
       html: '<span> Accuracy    &nbsp<input type="range" min="0" max="100" value="50" style="width:50%;margin-left:0.5rem"></span><br>' +
         '<br><span class="mt-2">Tag  &nbsp &nbsp &nbsp &nbsp &nbsp<input type="text" style="width:52%;margin-left:0.5rem"></span>',
       confirmButtonText: "Save",
       confirmButtonColor: '#321FDB',
     });*/
    var parent = document.getElementById('label-studio1');
    (<HTMLElement>parent.getElementsByClassName('ls-submit-btn')[0]).click()
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

    var markInfo = JSON.parse(localStorage.getItem('markInfo') || '[]');
    console.log(markInfo)
    const xray_info = {
      xray_id: this.id,
      user_id: this.xRayData[0]?.user_id,
      marker: markInfo,
      accuracy_per: this.valInput,

    }
    console.log(xray_info)
    this.userService.addEvalDataFromAdmin(xray_info).subscribe((res: any) => {
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
  }
  renderImage(img: string) {
    if (img) {
      return this.baseLink + img;
    } else {
      return '../assets/images/edit.png';
    }
  }
  handleClick() {
    this.router.navigateByUrl('/uploaded-xray');
  }
}
