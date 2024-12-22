import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostDataService {
  defaultPosts: any[] = [
    {
      "MovieName": "Inception",
      "description": "A mind-bending thriller about dreams within dreams.",
      "location": {
        "city": "Paris",
        "country": "France"
      },
      media:{
      src: "https://movie-locations.com/movies/i/Inception-Da-Stuzzi.jpg",
      type: "image"
      },
      "user": "Chris Nolan"
    },
    {
      "MovieName": "The Dark Knight",
      "description": "The rise of the Dark Knight in Gotham City.",
      "location": {
        "city": "London",
        "country": "UK"
      },
      media: {
      src: "https://www.movie-locations.com/movies/d/Dark-Knight-Criterion.jpg",
      type: "image"
      },
      "user": "Bruce Wayne"
    },
    {
      "MovieName": "Interstellar",
      "description": "A journey beyond the stars to save Earth.",
      "location": {
        "city": "Eldhraun Lava Field",
        "country": "Iceland"
      },
      media:{
        src: "https://movie-locations.com/movies/i/Interstellar-Eldhraun.jpg",
        type: "image"
      },      
      "user": "Cooper"
    },
    {
      "MovieName": "Gladiator",
      "description": "The epic tale of a Roman general turned gladiator.",
      "location": {
        "city": "Valletta",
        "country": "Malta"
      },
      media: {
        src: "https://movie-locations.com/movies/a/Assassins-Creed-Fort-Manoel.jpg",
        type: "image"
      },
      "user": "Maximus Decimus"
    },
    {
      "MovieName": "The Lord of the Rings",
      "description": "A fellowship embarks on a quest to destroy the One Ring.",
      "location": {
        "city": "Wellington",
        "country": "New Zealand"
      },
      media:{
        src: "https://www.movie-locations.com/movies/l/Lord-Of-The-Rings-1-Hobbiton.jpg",
        type: "image"
      },
      "user": "Frodo Baggins"
    },
    {
      "MovieName": "La La Land",
      "description": "A musical about dreams and love in Los Angeles.",
      "location": {
        "city": "Los Angeles",
        "country": "USA"
      },
      media: {
        src: "https://movie-locations.com/movies/l/La-La-Land-Wilcox-Avenue.jpg",
        type: "image"
      },
      "user": "Sebastian & Mia"
    }
  ];

  getDefaultPosts(): any[] {
    return this.defaultPosts;
  }
}