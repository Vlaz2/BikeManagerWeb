import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServerConnectionService } from 'src/app/services/server-connection.service';
import { TypeBikeService } from 'src/app/services/type-bike.service';
import { Bike } from 'src/app/models/bike'
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-bike-list',
  templateUrl: './bike-list.component.html',
  styleUrls: ['./bike-list.component.css']
})
export class BikeListComponent implements OnInit {

  public createBikeForm: FormGroup;
  public bikes: Array<Bike> = new Array<Bike>();

  public constructor(private fb: FormBuilder,
    public typeBikeService: TypeBikeService,
    private server: ServerConnectionService,) { }

  ngOnInit(): void {
    this.formForCreateBikeInitialization();
    this.updateBikeList();
  }

  private formForCreateBikeInitialization() {
    this.createBikeForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      typeBikeId: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.server.postQuery('/bike', this.createBikeForm.value).subscribe(() => {
      this.updateBikeList();
      console.log("Bike created successfuly");
    }, (err: HttpErrorResponse) => {
      console.log(err.error)
    })
  }

  private updateBikeList() {
    this.server.getQuery('/bike/').subscribe((data) => {
      this.bikes = data as Bike[];
    }, (err: HttpErrorResponse) => {
      console.log(err.error)
    })
  }

  public deleteBike(id: number) {
    this.server.deleteQuery('/bike/' + id).subscribe(() => {
      this.updateBikeList();
      console.log("Bike deleted successfuly");
    }, (err: HttpErrorResponse) => {
      console.log(err.error)
    })
  }

  public changeRentOnBike(bike: Bike) {
    this.server.putQuery('/bike/', bike).subscribe(() => {
      this.updateBikeList();
      console.log("Change rent successfuly");
    }, (err: HttpErrorResponse) => {
      console.log(err.error)
    })
  }
}