import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchingService {
  private apiUrl = 'http://localhost:3000/api/matching';

  constructor(private http: HttpClient) {}

  // ฟังก์ชัน Stable Matching
  stableMatching(userPreferences: number[][], friendPreferences: number[][]): number[] {
    const n = userPreferences.length;
    const freeUsers = Array.from({ length: n }, (_, i) => i); // Users not matched yet
    const nextProposal = Array(n).fill(0); // Track which friend each user will propose next
    const friendPartner = Array(n).fill(-1); // Current partners for each friend (-1 means unpaired)

    while (freeUsers.length > 0) {
      const user = freeUsers.shift()!; // Get the next free user
      const friend = userPreferences[user][nextProposal[user]]; // Friend to propose to next
      nextProposal[user]++; // Increment the proposal count for the user

      if (friendPartner[friend] === -1) {
        // If friend is unpaired, pair with this user
        friendPartner[friend] = user;
      } else {
        // If friend already has a partner, check preference
        const currentPartner = friendPartner[friend];
        if (friendPreferences[friend].indexOf(user) < friendPreferences[friend].indexOf(currentPartner)) {
          // Friend prefers the new user, so replace the current partner
          friendPartner[friend] = user;
          freeUsers.push(currentPartner); // The old partner is now free
        } else {
          // Friend prefers current partner, so this user remains free
          freeUsers.push(user);
        }
      }
    }

    return friendPartner;
  }

  // ฟังก์ชันสำหรับดึงข้อมูลแมวจาก API
  getCats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/cats`);
  }

  // ฟังก์ชันคำนวณคะแนนความชอบระหว่างแมวสองตัว
  calculatePreferenceScore(catA: any, catB: any): number {
    let score = 0;
    if (catA.Breed === catB.Breed) score += 10;
    if (catA.Sex !== catB.Sex) score += 5;
    const ageDifference = Math.abs(parseInt(catA.Age) - parseInt(catB.Age));
    if (ageDifference <= 1) score += 8;
    if (catA.Location === catB.Location) score += 7;
    return score;
  }
  
}
