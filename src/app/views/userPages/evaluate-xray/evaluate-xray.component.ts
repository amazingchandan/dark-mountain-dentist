import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import LabelStudio from 'label-studio';

@Component({
  selector: 'app-evaluate-xray',
  templateUrl: './evaluate-xray.component.html',
  styleUrls: ['./evaluate-xray.component.scss']
})
export class EvaluateXrayComponent {
  // is equal to default value of input range
  constructor(private route: ActivatedRoute,
    private userService: UserService) {

  }

  valInput = '25';
  leftPos = `25%`;
  marker: any = [];
  xRayData: any = [];
  userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  baseLink: string = environment.API_HOST;
  id: any;
  labelStudio :any;

  onRangeChange(event: any) {
    this.valInput = (<HTMLInputElement>event.target).value.trim();
    this.leftPos = `${+(<HTMLInputElement>event.target).value.trim() - 5}%`
  }

 ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('xray_id');
    this.getXray(this.id);
    setTimeout(() => {
      this.createLabelStudio();
    }, 1000);
    //this.createLabelStudio();


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

  //label-studio
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
 <EllipseLabels name="tag" toName="img">
 <Label value="Add Mark" style=""></Label>

 
 </EllipseLabels>
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
          image: this.baseLink+this.xRayData[0]?.xray_image.path
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
    
   console.log(this.labelStudio)
    return this.labelStudio;
  }

  createLabe(name){
    console.log(name)
  }

  submit(){
    var labelStudio = new LabelStudio('label-studio', {

      onSubmitAnnotation: async function (LS, annotation) {
        console.log(annotation.serializeAnnotation());
      },
    })

  }
  //



  save() {
    Swal.fire({
      title: "",
      html: '<span> Accuracy    &nbsp<input type="range" min="0" max="100" value="50" style="width:50%;margin-left:0.5rem"></span><br>' +
        '<br><span class="mt-2">Tag  &nbsp &nbsp &nbsp &nbsp &nbsp<input type="text" style="width:52%;margin-left:0.5rem"></span>',
      confirmButtonText: "Save",
      confirmButtonColor: '#321FDB',
    });
  
   (<HTMLElement>document.getElementsByClassName('ls-submit-btn')[0]).click()
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


    const xray_info = {
      xray_id: this.id,
      user_id: this.xRayData[0]?.user_id,
      marker: this.marker,
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
  }
  renderImage(img: string) {
    if (img) {
      return this.baseLink + img;
    } else {
      return '../assets/images/no-image.jpg';
    }
  }
}
