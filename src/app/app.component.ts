import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  form: FormGroup
  tariff_1 = new Tariff(4,5,4000,false,20,0,0)
  tariff_2 = new Tariff(8,20,5000,false,50,7,30)
  tariff_3 = new Tariff(15,-1,0,false,50,16,30)

  tariff_4 = new Tariff(0.5,15,50,true,50,5,50)
  tariff_5 = new Tariff(2,20,50,true,60,8,30)
  tariff_6 = new Tariff(4,-1,0,false,60,16,20)

  rez_tarrif_1: any
  rez_tarrif_2: any
  rez_tarrif_3: any
  rez_tarrif_4: any
  rez_tarrif_5: any
  rez_tarrif_6: any
  
  ngOnInit() {
    this.form = new FormGroup({
      kilometers: new FormControl(null, [
        Validators.required
      ]),
      age: new FormControl(null, [
        Validators.required
      ]),
      weight: new FormControl(null, [
        Validators.required
      ])
    })
  }

  submit() {
    if (this.form.valid) {
      const formData = {...this.form.value}
       this.rez_tarrif_1 = this.tariff_1.pay(formData.kilometers,formData.age,formData.weight)
      this.rez_tarrif_2 = this.tariff_2.pay(formData.kilometers,formData.age,formData.weight)
      this.rez_tarrif_3 = this.tariff_3.pay(formData.kilometers,formData.age,formData.weight)
      this.rez_tarrif_4 = this.tariff_4.pay(formData.kilometers,formData.age,formData.weight)
      this.rez_tarrif_5 = this.tariff_5.pay(formData.kilometers,formData.age,formData.weight)
      this.rez_tarrif_6 = this.tariff_6.pay(formData.kilometers,formData.age,formData.weight)
    }
  }
}

class Tariff{
  cost_km: number
  free_weight: number
  pay_weight: number
  pay_weight_kg: boolean
  max_weight: number
  free_age: number
  free_age_discount: number
  rez: any

  constructor(cost_km: number, free_weight: number, pay_weight: number, pay_weight_kg: boolean, max_weight: number, free_age: number, free_age_discount: number){
    this.cost_km = cost_km
    this.free_weight = free_weight
    this.pay_weight = pay_weight
    this.pay_weight_kg = pay_weight_kg
    this.max_weight = max_weight
    this.free_age = free_age
    this.free_age_discount = free_age_discount
  }

  pay(kilometers: number, age: number, weight:number){
    this.rez = 0
    let currency = "Р"
    if(weight>this.max_weight){
      this.rez = "недоступен"
      currency = ""
    }else if(this.free_weight==-1){
      this.rez = this.rez + kilometers*this.cost_km
      if(age<=this.free_age){
        this.rez = this.rez - ((this.rez*this.free_age_discount)/100)
      }
    }else if(weight>this.free_weight){
      this.rez = this.rez + kilometers*this.cost_km
      if(age<=this.free_age){
        this.rez = this.rez - ((this.rez*this.free_age_discount)/100)
      }
      if(this.pay_weight_kg){
        this.rez = this.rez + this.pay_weight*weight
      }else{
        this.rez = this.rez + this.pay_weight
      }
    }else{
      this.rez = this.rez + kilometers*this.cost_km
      if(age<=this.free_age){
        this.rez = this.rez - ((this.rez*this.free_age_discount)/100)
      }
    }
    return this.rez+" "+currency
  }
}