import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: []
})
export class TemplateComponent implements OnInit {


  usuario = {
    nombre: null,
    apellido: null,
    email: null,
    pais: "",
    sexo: "",
    acepta: null
  }
  
  paises = [{
    codigo: "COL",
    nombre: "Colombia"
  },{
    codigo: "ESP",
    nombre: "España"
  }];

  sexos = ["Hombre", "Mujer"];

  constructor() { }

  ngOnInit(): void {
  }

  guardar(formulario:NgForm){
    console.log("Formulario: ", formulario);
    console.log("Formulario Value: ", formulario.value);
    console.log("Usuario ", this.usuario);
  }

}
