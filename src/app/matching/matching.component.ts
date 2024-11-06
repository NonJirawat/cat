import { Component, OnInit } from '@angular/core';
import { MatchingService } from '../matching.service';

@Component({
  selector: 'app-matching',
  templateUrl: './matching.component.html',
  styleUrls: ['./matching.component.css']
})
export class MatchingComponent implements OnInit {
  matchedCats: any[] = []; // กำหนด matchedCats เพื่อเก็บผลการจับคู่
  userPreferences: any; // เก็บข้อมูลการตั้งค่าของผู้ใช้

  constructor(private matchingService: MatchingService) {}

  ngOnInit(): void {
    this.fetchMatches(); // เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลการจับคู่เมื่อ component โหลด
  }

  fetchMatches(): void {
    this.matchingService.getMatches().subscribe({
      next: (data) => {
        this.matchedCats = data.matchedCats;
        this.userPreferences = data.preferences; // เก็บข้อมูลการตั้งค่าของผู้ใช้
      },
      error: (err) => console.error('Error fetching matches:', err)
    });
  }
}
