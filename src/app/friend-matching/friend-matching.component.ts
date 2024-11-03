import { Component, OnInit } from '@angular/core';
import { MatchingService } from '../matching.service';


@Component({
  selector: 'app-friend-matching',
  templateUrl: './friend-matching.component.html'
})
export class FriendMatchingComponent implements OnInit {
  matches: any[] = [];
  cats: any[] = []; // ข้อมูลแมวของผู้ใช้ทั้งหมด

  constructor(private matchingService: MatchingService) {}

  ngOnInit(): void {
    this.loadCats();
  }

  // ดึงข้อมูลแมวจาก backend
  loadCats(): void {
    this.matchingService.getCats().subscribe({
      next: (data: any[]) => { // กำหนดประเภทให้ data เป็น array
        this.cats = data;
        this.runMatchingAlgorithm();
      },
      error: (err: any) => { // กำหนดประเภทให้ err เป็น any
        console.error('Error fetching cats:', err);
      }
    });
  }
  
  // ฟังก์ชันคำนวณลำดับความชอบของผู้ใช้แต่ละคน
  generatePreferences(): { userPreferences: number[][], friendPreferences: number[][] } {
    const userPreferences: number[][] = [];
    const friendPreferences: number[][] = [];
  
    this.cats.forEach((catA, indexA) => {
      const userPref = this.cats
        .map((catB, indexB) => ({
          index: indexB,
          score: this.matchingService.calculatePreferenceScore(catA, catB)
        }))
        .filter(item => item.index !== indexA) // ไม่ให้จับคู่กับตัวเอง
        .sort((a, b) => b.score - a.score) // เรียงคะแนนจากสูงไปต่ำ
        .map(item => item.index);
  
      userPreferences.push(userPref);
      friendPreferences.push([...userPref]); // สมมุติว่าความชอบกลับกันสำหรับคู่
    });
  
    return { userPreferences, friendPreferences };
  }
  

  // ฟังก์ชันจับคู่เพื่อน
  runMatchingAlgorithm(): void {
    const { userPreferences, friendPreferences } = this.generatePreferences();
    this.matches = this.stableMatching(userPreferences, friendPreferences);
    console.log('Matched pairs:', this.matches);
  }

  // อัลกอริทึม Stable Matching
  stableMatching(userPreferences: number[][], friendPreferences: number[][]): number[] {
    const n = userPreferences.length;
    const freeUsers = Array.from({ length: n }, (_, i) => i);
    const nextProposal = Array(n).fill(0);
    const friendPartner = Array(n).fill(-1);

    while (freeUsers.length > 0) {
      const user = freeUsers.shift()!;
      const friend = userPreferences[user][nextProposal[user]];
      nextProposal[user]++;

      if (friendPartner[friend] === -1) {
        friendPartner[friend] = user;
      } else {
        const currentPartner = friendPartner[friend];
        if (friendPreferences[friend].indexOf(user) < friendPreferences[friend].indexOf(currentPartner)) {
          friendPartner[friend] = user;
          freeUsers.push(currentPartner);
        } else {
          freeUsers.push(user);
        }
      }
    }

    return friendPartner;
  }
}
