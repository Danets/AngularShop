import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.css'],
})
export class LightboxComponent implements OnInit {
  public images = [
    'https://source.unsplash.com/7BLRSG-AkJs',
    'https://source.unsplash.com/yQUwIlUeU4o',
    'https://source.unsplash.com/MlaQmWvzRTw',
    'https://source.unsplash.com/6dTpYUcr1yg',
    'https://source.unsplash.com/EyEdZ2aKRfA',
    'https://source.unsplash.com/qkJ4kHexI2o',
    'https://source.unsplash.com/XrO6WBflFRo',
  ];

  slideIndex = 0;

  public openModal(): void {
    document.getElementById('imgModal').style.display = 'block';
  }

  public closeModal(): void {
    document.getElementById('imgModal').style.display = 'none';
  }

  public plusSlides(n): void {
    this.showSlides((this.slideIndex += n));
  }

  public currentSlide(n): void {
    this.showSlides((this.slideIndex = n));
  }

  showSlides(slideIndex);

  public showSlides(n): void {
    let i;
    const slides = document.getElementsByClassName(
      'img-slides'
    ) as HTMLCollectionOf<HTMLElement>;
    const dots = document.getElementsByClassName(
      'images'
    ) as HTMLCollectionOf<HTMLElement>;

    if (n > slides.length) this.slideIndex = 1;
    if (n < 1) this.slideIndex = slides.length;

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }

    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(' active', '');
    }

    slides[this.slideIndex - 1].style.display = 'block';

    if (dots && dots.length > 0) {
      dots[this.slideIndex - 1].className += ' active';
    }
  }

  constructor() {}

  ngOnInit(): void {}
}
