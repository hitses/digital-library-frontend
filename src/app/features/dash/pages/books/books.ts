import { Component } from '@angular/core';
import { ResumeCard } from '../../components/home/resume-card/resume-card';

@Component({
  selector: 'app-books',
  imports: [ResumeCard],
  templateUrl: './books.html',
  styles: ``,
})
export default class Books {
  stats = {
    totalBooks: 128,
    featuredBooks: 9,
    avgRating: 4.2,
  };

  books = [
    {
      _id: '1',
      title: 'El silencio de la ciudad blanca',
      author: 'Eva García Sáenz de Urturi',
      isbn: '9788491290664',
      coverUrl: 'https://m.media-amazon.com/images/I/81f93vY2T-L._AC_UF1000,1000_QL80_.jpg',
      featured: true,
    },
    {
      _id: '2',
      title: 'Los pilares de la Tierra',
      author: 'Ken Follett',
      isbn: '9780451225245',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/91t6yVjcp-L.jpg',
      featured: false,
    },
    {
      _id: '3',
      title: 'Cien años de soledad',
      author: 'Gabriel García Márquez',
      isbn: '9780307474728',
      coverUrl: 'https://images.penguinrandomhouse.com/cover/9780525562443',
      featured: false,
    },
  ];

  editBook(bookId: string) {}
}
