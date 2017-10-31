import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { DataService } from './data.service';
import { Deck } from './deck';
import { Card } from './card';
import { Review } from './review';

import * as moment from 'moment';

@Component({
  selector: 'stats',
  templateUrl: './stats.component.html'
})

export class StatsComponent implements OnInit {
  reviews: Review[];
  cards: Card[];
  decks: Deck[];

  public answersByQualityChartOptions: any;
  public answersByQualityChartColors: any[];
  public answersByQualityChartLabels: string[];
  public answersByQualityChartType: string;
  public answersByQualityChartLegend: boolean;
  public answersByQualityChartData:any[];

  public cardsPerDeckChartOptions: any;
  public cardsPerDeckChartColors: any[];
  public cardsPerDeckChartLabels: string[];
  public cardsPerDeckChartType: string;
  public cardsPerDeckChartLegend: boolean;
  public cardsPerDeckChartData:any[];

  public reviewsThisWeekChartOptions: any;
  public reviewsThisWeekChartColors: any[];
  public reviewsThisWeekChartLabels: string[];
  public reviewsThisWeekChartType: string;
  public reviewsThisWeekChartLegend: boolean;
  public reviewsThisWeekChartData:any[];

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getDecks();
    this.getCards();
    this.getReviews();
  }

  getReviews(): void {
    this.dataService.getReviews()
    .then(reviews => {
      this.reviews = reviews
      this.createAnswersByQualityChart();
      this.createReviewsThisWeekChart();
    });
  }

  getCards(): void {
    this.dataService.getCards()
    .then(cards => this.cards = cards);
  }

  getDecks(): void {
    this.dataService.getDecks()
    .then(decks => {
      this.decks = decks;
      this.createCardsPerDeckChart();
    });
  }

  numberOfAnswersWithQuality(quality: number) {
    return this.reviews.filter(review => {
      return review.answer_quality === quality;
    }).length
  }

  createAnswersByQualityChart(): void {
    this.answersByQualityChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true
    };
    this.answersByQualityChartColors = [
      {
        backgroundColor: [
          'rgba(153, 0, 0, 0.6)',
          'rgba(255, 128, 0, 0.6)',
          'rgba(128, 128, 128, 0.6)',
          'rgba(0, 153, 0, 0.6)',
          'rgba(0, 153, 153, 0.6)',
          'rgba(0, 128, 255, 0.6)'
        ]
      }
    ]
    this.answersByQualityChartLabels = [
      "Again",
      "Very Hard",
      "Hard",
      "Good",
      "Easy",
      "Very Easy"
    ];
    this.answersByQualityChartType = 'doughnut';
    this.answersByQualityChartLegend = true;
    this.answersByQualityChartData = [
      {data: [
        this.numberOfAnswersWithQuality(0),
        this.numberOfAnswersWithQuality(1),
        this.numberOfAnswersWithQuality(2),
        this.numberOfAnswersWithQuality(3),
        this.numberOfAnswersWithQuality(4),
        this.numberOfAnswersWithQuality(5)
      ]}
    ];
  }

  createCardsPerDeckChart(): void {
    this.cardsPerDeckChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true,
      scales: {
        xAxes: [{
          barPercentage: 0.4
        }],
        yAxes: [{
          ticks: {
            suggestedMin: 0
          }
        }]
      }
    }

    this.cardsPerDeckChartColors = [
      { backgroundColor: 'rgba(0, 76, 153, 0.6)' }
    ]

    let labels = [];
    this.decks.forEach(deck => {
      labels.push(deck.name);
    });
    this.cardsPerDeckChartLabels = labels;

    this.cardsPerDeckChartType = 'bar';
    this.cardsPerDeckChartLegend = false;

    let data = [];
    this.decks.forEach(deck => {
      data.push(deck.cards.length);
    });
    this.cardsPerDeckChartData = [
      { data: data }
    ];
  }

  createReviewsThisWeekChart(): void {
    this.reviewsThisWeekChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true,
      scales: {
        xAxes: [{
          barPercentage: 0.4
        }],
        yAxes: [{
          ticks: {
            suggestedMin: 0
          }
        }]
      }
    }

    this.reviewsThisWeekChartColors = [
      { backgroundColor: 'rgba(0, 153, 0, 0.6)' }
    ]

    let labels = [];
    [6,5,4,3,2,1,0].forEach(days => {
      labels.push(moment().subtract(days, 'days').format("YYYY/MM/DD"));
    });
    this.reviewsThisWeekChartLabels = labels;

    this.reviewsThisWeekChartType = 'bar';
    this.reviewsThisWeekChartLegend = false;

    let data = [];
    labels.forEach(date => {
      data.push(this.reviews.filter(review => {
        return moment(review.review_date).format("YYYY/MM/DD") === date;
      }).length);
    });
    this.reviewsThisWeekChartData = [{data: data}];
  }
}
