import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';;

@Component({
  selector: 'app-widgets-user-dropdown',
  templateUrl: './widgets-user-dropdown.component.html',
  styleUrls: ['./widgets-user-dropdown.component.scss']
})
export class WidgetsUserDropdownComponent {
  noOfXray: any=0;
  userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  noOfAiCavity: any=0;
  count: any =0;
  planDetail: any;
  newPass: string;
  cnfPass: string;
  curPass: string;
  ALPHA_NUMERIC_REGEX = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=\S+$).{7,20}$/;
  noOfXrayEval: any=0;
  constructor(
   // private changeDetectorRef: ChangeDetectorRef,
    private userService: UserService,
    public router :Router,
  ) {}

  ngOnInit(): void {
    //this.setData();
    this.dashboard();
  }
  dashboard(){
    this.userService.noOfXrayByID(this.userInfo.id).subscribe((res:any)=>
    {
      if(res.success){
       this.noOfXray=res.getData;
       console.log("noOfXray",this.noOfXray)
      }
    })
    this.userService.noOfXrayEvalByID(this.userInfo.id).subscribe((res:any)=>
    {
      if(res.success){
       this.noOfXrayEval=res.getData;
       console.log("noOfXray",this.noOfXrayEval)
      }
    })
    this.userService.noOfCavityByAI(this.userInfo.id).subscribe((res:any)=>
    {
      if(res.success){
       this.noOfAiCavity=res.getData;
       console.log("noOfXray",this.noOfAiCavity)
      }
      for(let i=0;i<this.noOfAiCavity.length;i++)
      {
        if(this.noOfAiCavity[i].evaluation?.length > 0){
             let n=this.noOfAiCavity[i].evaluation[0]?.ai_identified_cavities?.color_labels?.length
          if(n==undefined)
       { 
           console.log(n
          ,"***")
          
        }
        else{
          this.count= this.count+this.noOfAiCavity[i].evaluation[0]?.ai_identified_cavities?.color_labels.length
          console.log(this.count)
        }
      }
    }
     console.log(this.count)
    })
    this.userService.getUserPlanById(this.userInfo.id).subscribe((res:any)=>
    {
      if(res.success){
       this.planDetail=res.getData;
       console.log("planDetail",this.planDetail)
      }
    })
  }
  onCurPass(event : any){
    this.curPass = (<HTMLInputElement>event.target).value.trim();
  }
  onNewPass(event: any){
    this.newPass = (<HTMLInputElement>event.target).value.trim();
  }
  onCnfPass(event: any){
    this.cnfPass = (<HTMLInputElement>event.target).value.trim();
  }

  setNew(){
    const data={
      id:this.userInfo.id,
      password:this.curPass,
      newPassword: this.newPass,
      cnfPassword: this.cnfPass


    }
    console.log(this.curPass,this.newPass,this.cnfPass)
    if(this.curPass !== undefined && this.newPass !== undefined && this.cnfPass !==undefined ){
      if (!this.ALPHA_NUMERIC_REGEX.test(this.cnfPass) || !this.ALPHA_NUMERIC_REGEX.test(this.cnfPass) || this.cnfPass.length < 7 || this.newPass.length < 7) {
        Swal.fire({
          text: 'Password must be contain atleast 7 characters and atleast one letter and one number',
          icon: 'warning'
        });
        return false;
      }
      else if (this.newPass !== this.cnfPass) {
        Swal.fire({
          text: 'The password confirmation does not match, please try again',
          icon: 'error'
        });
        return false;
      }
      else
      {
        this.userService.resetPassword( data).subscribe((res:any) => {
        console.log("Password changes",res);
        if(res.success){
          Swal.fire({
            text: 'Password changed successfully',
            icon: 'success'
          });
          document.getElementById('close')?.click();
          return true;
        }
       // this.router.navigateByUrl("/login")
      })
    }
    
   
    } 
    else{
      Swal.fire({
        text: 'Please enter the password',
        icon: 'error'
      });
      return false;
      
    }
  }

}
