import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { Project } from '../../tasks/project.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/appstate';
import * as moment from 'moment';

@Component({
  selector: 'app-graph-block',
  templateUrl: './graph-block.component.html',
  styleUrls: ['./graph-block.component.css'],
})
export class GraphBlockComponent implements OnInit {
  tasks;
  project: Project;
  data: number[] = [];
  labels: number[] = [];
  chart: Chart;
  duration = 1;
  timerThreads = 1;

  startTimeRef = new Date();
  endTimeRef = new Date();

  startTimeStringRef: string;
  endTimeStringRef: string;

  idealRateData: number[] = [];

  set startTime(value: Date) {
    this.updateScale();
    this.startTimeRef = value;
    this.startTimeStringRef = moment(
      this.startTimeRef.toLocaleString(),
      'DD.MM.YYYY, HH:mm:SS'
    ).format('DD/MM/YY HH:mm');
  }

  set endTime(value: Date) {
    this.updateScale();
    this.endTimeRef = value;
    this.endTimeStringRef = moment(
      this.endTimeRef.toLocaleString(),
      'DD.MM.YYYY, HH:mm:SS'
    ).format('DD/MM/YY HH:mm');
  }

  get startTime(): Date {
    return this.startTimeRef;
  }

  get endTime(): Date {
    return this.endTimeRef;
  }

  private tasksLeftRef: number;
  set tasksLeft(value: number) {
    this.tasksLeftRef = value;
    if (this.chart) {
      this.updateData();
    }
  }

  get tasksLeft(): number {
    return this.tasksLeftRef;
  }

  constructor(private store: Store<AppState>) {
    this.store.subscribe(
      (state) =>
        (this.tasksLeft = Object.values(state.project.tasks).filter(
          (task) => task.status === 'To do'
        ).length)
    );
    this.store.subscribe((state) => {
      this.startTime = state.project.startDate;
      this.endTime = state.project.endDate;
      this.duration =
        (state.project.endDate.getTime() - state.project.startDate.getTime()) /
        6e4;
    });

    this.data = [this.tasksLeft];
    this.updateScale();
  }

  updateScale(): void {
    this.labels = [];
    this.idealRateData = [];

    for (let i = 0; i < this.duration + 1; i++) {
      this.idealRateData.push(
        this.tasksLeft - (this.tasksLeft * i) / this.duration
      );
    }

    for (let i = 0; i < this.duration + 1; i++) {
      this.labels.push(i);
    }
    // console.log(this.labels)

    if (this.chart) {
      this.updateData();
    }
  }

  ngOnInit(): void {
    // TODO: Updare chart on date change
    // console.log(this.endTime.toUTCString());
    // console.log("DURATION", this.duration);

    const canvas = document.getElementById('burndown') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    this.chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Progress',
            // backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'crimson',
            data: this.data,
            pointRadius: 0,
          },
          {
            label: 'Ideal burn rate',
            // backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(70, 70, 70)',
            data: this.idealRateData,
            pointRadius: 0,
          },
        ],
      },

      // Configuration options go here
      options: {
        responsive: true,
        legend: {
          display: false,
        },
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              ticks: {
                autoSkip: true,
                maxTicksLimit: 5,
              },
              display: false,
            },
          ],
          yAxes: [
            {
              ticks: {
                stepSize: 1,
              },
            },
          ],
        },
      },
    });
    this.updateData(true);
  }

  updateData(startTimer = false) {
    if (this.data.length === 0) {
      this.data.push(this.tasksLeft);
    } else {
      this.fitToLabel(this.tasksLeft);
      // console.log(this.data);
    }

    this.chart.data.datasets[0].data = this.data;
    this.chart.update();

    if (startTimer) {
      setTimeout(() => this.updateData(true), 60000);
    }
  }

  fitToLabel(entry: number) {
    const currentDate = new Date();

    const dif = currentDate.getTime() - this.startTime.getTime();

    const secondsFromT1toT2 = dif / 60000;
    const secondsBetweenDates = Math.abs(secondsFromT1toT2);

    // console.log(Seconds_Between_Dates);
    if (
      currentDate.getMinutes() - this.startTime.getMinutes() <
      this.data.length
    ) {
      // console.log('1');
      this.data[this.data.length - 1] = entry;
    }
    // else if (Seconds_Between_Dates - this.data.length > 1){
    //   console.log('2');
    //   for (let i=0; i < Seconds_Between_Dates - this.data.length - 1; i++) {
    //     this.data.push(this.data[this.data.length - 1])
    //   }
    //   this.data.push(entry);
    // }
    else {
      // console.log('3');
      this.data.push(entry);
    }
  }
}
