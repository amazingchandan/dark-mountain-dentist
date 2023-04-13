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
  AIMarkData: any = [];
  markInfo: any = [];
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
        console.log(this.userMark, "***", this.AIMarkData)
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
    console.log(this.markInfo, "adminMark")
    const resultArrUser = this.userMark.map((element: any) => {
      let obj = {
        "from_name": "label",
        "id": element.id,
        "type": "rectanglelabels",
        "source": "$image",
        "readonly": false,
        "canrotate": false,
        // "original_width":this.userMark[1]?.original_height,
        "original_width": element.original_width,
        "original_height": element.original_height,
        "image_rotation": 0,
        "to_name": "img",

        "fillColor": "#00ff00",
        "background": "green",
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
    const resultArrAI = this.AIMarkData.rectangle_coordinates.map((element: any) => {
      let obj = {
        "from_name": "label",
        "id": element._id,
        "type": "rectanglelabels",
        "source": "$image",
        // "readonly": true,
        // "original_width":this.userMark[1]?.original_height,
        "original_width": "",
        "original_height": "",
        "image_rotation": 0,
        "to_name": "img",

        "fillColor": "#00ff00",
        "background": "red",
        "value":
        {
          "x": element.coordinates[0] * 100.00 / 480,
          "y": element.coordinates[1] * 100.00 / 480,
          "width": (element.coordinates[2] - element.coordinates[0]) * 100.0 / 480,
          "height": (element.coordinates[3] - element.coordinates[1]) * 100.0 / 480,
          "rotation": 0,
          "rectanglelabels": [
            "AI Mark"
          ]
        },
        " readonly": "true"
      }

      console.log(obj)
      return obj;
      // return element.original_width
    })

    //Admin Marking
    /* const resultArrAdmin = this.markInfo.map((element: any) => {
      let obj = {
        "from_name": "label",
        "id": element.id,
        "type": "rectanglelabels",
        "source": "$image",
       "readonly": false,
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
            "Admin Mark1"
        ]
    }
    
    
    
      }
    
    console.log(obj)
      return obj;
      // return element.original_width
    })*/


    const resultArr = resultArrUser.concat(resultArrAI)
    //const resultArr = resultArrAdmin.concat(resultArr1)
    this.labelStudio = new LabelStudio('label-studio',


      {
        config: `
  <View style="display:row; flex-direction: column;">
  <Style> .Controls_wrapper__1Zdbo { display:none; }</Style>
  <Style>.Segment_block__1fyeG {background:transparent !important; border:none; margin-right:0px !important}</Style>
  <Style> .Hint_main__1Svrz { display:none; }</Style>
  <Style>#label-studio .ant-tag {color:white !important; font-weight:bold !important;border:none !important; }</Style>
 <Style> .App_menu__X-A5N{visibility:hidden}</Style>
 <Style> .ls-common {height:354px !important}</Style>
  <View style="flex: 90%;  
 margin-top: -14px; width:566px">
 <Style> .ImageView_container__AOBmH img {  height:354px !important }</Style>
 <Image name="img" value="$image" width="100%" height="100%"></Image>
 <Style> canvas { width:566px; height:354px !important;  }</Style>
 </View>
 <View style="float:right;visibility:hidden">
 <RectangleLabels name="label" toName="img" background="green" editable="false" readOnly="true" canRotate="false">
 <Label value="Add Mark" background="green"/> 
 <Label value="AI Mark" background="#8b0000" editable="false"  readOnly="true"/>
 <Label value="Admin Mark" background="#00008B" />
 <!--<Label value="Admin Mark1" background="#00008B" readOnly="false" />-->
 </RectangleLabels>
 </View>
<View style="flex: 10%;position: absolute;left: 160%;margin-top: 11px;"> 
 <RectangleLabels name="label1" toName="img" background="green" editable="false" readOnly="true">
<Label value="Add Mark" background="#00008B" />
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
          //"annotations:menu",
          "annotations:add-new",
          "annotations:delete",
          //"predictions:menu",

        ],

        /* user: {
           pk: 1,
           firstName: "James",
           lastName: "Dean"
         },*/

        task: {

          annotations: [{ result: resultArr }
          ],
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
        onDeleteAnnotation: async function (LS, annotation) {
          console.log("delete btn")
          console.log(annotation.serializeAnnotation())
        },
        onSubmitAnnotation: async function (LS, annotation) {

          /*this.marker = annotation.serializeAnnotation().map(({ id, original_height, original_width,
            value }) => ({ id, original_height, original_width, value }))
          console.log(this.marker[0].id)
          // localStorage.setItem('markInfo', ['markInfo']);
          localStorage.setItem('markInfo', JSON.stringify(this.marker));*/

          console.log(annotation.serializeAnnotation());

          return annotation.serializeAnnotation();

        },
        onUpdateAnnotation: async function (LS, annotation) {
          this.marker = annotation.serializeAnnotation().map(({ id, original_height, original_width,
            value }) => ({ id, original_height, original_width, value }))
          console.log(this.marker[0].id)
          // localStorage.setItem('markInfo', ['markInfo']);
          localStorage.setItem('markInfo', JSON.stringify(this.marker));
          console.log(annotation.serializeAnnotation(), "update");

        },


      });


    return this.labelStudio;

  }

  onLabelStudioEvent(event: any) {

    if (event.type === 'onEntityCreate') {
      const selectedAnnotationId = this.labelStudio.ls.annotations[this.labelStudio.ls.annotations.length - 1].id;
      console.log('Selected annotation ID:', selectedAnnotationId);
    }
  }


  //
  createLabelStudio1() {
    const labelStudio = new LabelStudio('label-studio1', {
      config: `
  <View style="display:row; flex-direction: column;">
  <Style> .Controls_wrapper__1Zdbo { display:none; }</Style>
  <Style>.Segment_block__1fyeG {background:transparent !important; border:none; margin-right:0px !important}</Style>
  <Style> .Hint_main__1Svrz { display:none; }</Style>
  <Style>.ant-tag {background-color:#02d959 !important; color:white !important; font-weight:bold !important;border:none !important}</Style>
 <View style="flex: 90%;
 margin-top: -14px;">
 <Style> .ImageView_container__AOBmH img {  height:354px !important }</Style>
 
 <Image name="img" value="$image" width="100%" height="100%" ></Image>
 <Style> canvas { width:594px; height:354px !important }</Style>
 </View>
 <View style="flex: 10%;float:right">
 <RectangleLabels name="tag" toName="img">
 <!-- <Label value="Add Mark" background="#00008B"></Label>
<Label value="Add Mark1" style=""></Label>-->

 </RectangleLabels>
 </View>

 </View>
 `,

      interfaces: [
        // "panel",
        // "update",
        //"submit",
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

        return annotation.serializeAnnotation();
      },
      onUpdateAnnotation: async function (LS, annotation) {
        console.log(annotation.serializeAnnotation());

      }


    });

    console.log(labelStudio)
    return labelStudio;

  }



  delete() {
    console.log("delete function")

    $('.Entity_button__3c64R .anticon-delete').trigger("click");
  }


  save() {
    console.log("submit");

    var parent = document.getElementById('label-studio');
    (<HTMLElement>parent.getElementsByClassName('ls-update-btn')[0]).click()
    // (<HTMLElement>document.getElementsByClassName('ls-submit-btn')[0]).click()
    console.log(this.labelStudio.onSubmitAnnotation, "***")
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
    // const newArr = this.AIMarkData._id.concat(this.userMark.id)
    //console.log(newArr,"new")
    this.markInfo = JSON.parse(localStorage.getItem('markInfo') || '[]');
    console.log(this.markInfo)
    console.log(this.userMark)
    const markInfo1 = this.markInfo.filter((elem) => {
      return this.userMark.every((ele) => {
        return elem.id !== ele.id;
      });
    });
    const markInfo2 = markInfo1.filter((elem) => {
      return this.AIMarkData.rectangle_coordinates.every((ele) => {
        return elem.id !== ele._id;
      });
    });

    console.log(markInfo2, "new data")

    const xray_info = {
      xray_id: this.id,
      user_id: this.xRayData[0]?.user_id,
      marker: markInfo2,
      accuracy_per: this.valInput,

    }
    console.log(xray_info)
    this.userService.addEvalDataFromAdmin(xray_info).subscribe((res: any) => {
      if (res.success) {
        Swal.fire({
          text: res.message,
          icon: 'success',
        });
        this.createLabelStudio()
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
