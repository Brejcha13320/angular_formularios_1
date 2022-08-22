import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, AsyncValidator, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: [`
  .p-t {
    margin-top: 10px;
  }
  `]
})
export class DataComponent implements OnInit {

  formulario:FormGroup;

  usuario:any = {
    nombreCompleto: {
      nombre: '',
      apellido: ''
    },
    email: '',
    pasaTiempos: []
  }

  constructor() {
    this.formulario = new FormGroup({
      //'nombre': new FormControl('NombrePorDefecto', ReglasDeValidacion, ReglasDeValidacionAsincrona )
      
      //MANEJANDO OBJETOS PARA LA DATA
      'nombreCompleto': new FormGroup({
        'nombre': new FormControl(/* this.usuario.nombrecompleto.nombre */'', [
          Validators.required,
          Validators.minLength(5)
          ] ),

        'apellido': new FormControl(/* this.usuario.nombrecompleto.apellido */'', [
          Validators.required,
          Validators.minLength(5)
          ] )
      }),

      'email': new FormControl(/* this.usuario.email */'', [
              Validators.required, 
              Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")
              ] ),

      'pasaTiempos': new FormArray([
        new FormControl('', Validators.required )
      ]),

      'username': new FormControl(/*'', Validators.required, /* this.existeUsuario */),

      'password1': new FormControl('', Validators.required),

      'password2': new FormControl()


    });

     /* this.formulario.setValue( this.usuario );  */

     this.formulario.controls['password2'].setValidators([
       Validators.required,
       this.noIgual.bind( this.formulario )
     ]);

     /* this.formulario.valueChanges
         .subscribe( data=>{
           console.log(data);
         } ) */

    /* this.formulario.controls['username'].valueChanges
        .subscribe( data=>{
          console.log(data);
        } ) */
    
    this.formulario.controls['username'].statusChanges
    .subscribe( data=>{
      console.log(data);
    } )





   }

  ngOnInit(): void {
  }

  noIgual( control: FormControl) {
    let form:any = this;
    if(control.value !== form.controls['password1'].value){
      return {
        noiguales:true
      }
    } 
    return null;
  }

  existeUsuario( control: FormControl ) {
    /* let promesa = new Promise( (resolve, reject)=>{
      setTimeout( ()=>{
        if(control.value === "strider"){
          resolve( {existe:true} );
        } else {
          resolve(null);
        }
      }, 3000 )
    } );
    return promesa; */
  }

  agregarPasatiempo(){
    (<FormArray>this.formulario.controls['pasaTiempos']).push(
      new FormControl('', Validators.required )
    )
  }



  pasaTiemposControls(){
    return (this.formulario.get('pasaTiempos') as FormArray).controls;
  }

  guardar(){
    //console.log(this.usuario);
    console.log(this.formulario);
    //console.log((this.formulario.get('pasaTiempos') as FormArray).controls);
    
    this.formulario.reset({
      nombreCompleto:{
        nombre: "",
        apellido: ""
      },
      email: ""
    });


    /* this.formulario.get('nombreCompleto.nombre')?.setValue('');
    this.formulario.get('nombreCompleto.apellido')?.setValue('');
    this.formulario.controls['email'].setValue(""); */


  }

}
