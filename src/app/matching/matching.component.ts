import { Component, OnInit } from '@angular/core';
import { MatchingService } from '../matching.service';

interface Cat {
  catName: string;
  breed: string;
  gender: string;
  age: number;
  image?: string;
}

@Component({
  selector: 'app-matching',
  templateUrl: './matching.component.html',
  styleUrls: ['./matching.component.css']
})
export class MatchingComponent implements OnInit {
  matchedCats: Cat[] = []; // กำหนด matchedCats ให้มีชนิดข้อมูลเป็นอาร์เรย์ของ Cat
  userPreferences: any; // เก็บข้อมูลการตั้งค่าของผู้ใช้

  constructor(private matchingService: MatchingService) {}

  ngOnInit(): void {
    this.fetchMatches(); // เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลการจับคู่เมื่อ component โหลด
  }

  fetchMatches(): void {
    this.matchingService.getMatches().subscribe({
      next: (data) => {
        // กำหนด matchedCats และตั้งค่า URL รูปภาพเองสำหรับแต่ละรายการ
        this.matchedCats = data.matchedCats.map((cat: Cat) => ({
          ...cat,
          image: 'https://catthailand.com/shop/2024067130624.jpg' // URL รูปภาพคงที่
        }));
        this.userPreferences = data.preferences; // เก็บข้อมูลการตั้งค่าของผู้ใช้
      },
      error: (err) => console.error('Error fetching matches:', err)
    });
  }
}
