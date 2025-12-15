// 리뷰 테스트용 시드 스크립트
// 관리자 / 사업자 리뷰 관리 화면이 잘 동작하는지 확인하기 위해 몇 개의 리뷰를 생성합니다.

import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "../config/db.js";
import Review from "./model.js";
import Hotel from "../hotel/model.js";
import { User } from "../user/model.js";

const run = async () => {
  try {
    await connectDB();

    // 아무 owner 한 명과 그 owner 가 가진 호텔 하나 선택
    const owner = await User.findOne({ role: "owner" });
    if (!owner) {
      console.log("owner(사업자) 유저가 없어 리뷰를 생성할 수 없습니다.");
      process.exit(0);
    }

    const hotel = await Hotel.findOne({ owner: owner._id });
    if (!hotel) {
      console.log("해당 owner 가 가진 호텔이 없어 리뷰를 생성할 수 없습니다.");
      process.exit(0);
    }

    // 리뷰 작성자(일반 유저 역할)로 사용할 계정이 없으면 owner 를 그대로 사용
    const anyUser = owner;

    const samples = [
      {
        hotelId: hotel._id,
        userId: anyUser._id,
        rating: 5,
        comment: "테스트 리뷰 1 - 아주 만족했습니다.",
        isReportedByUser: true,
        userReportReason: "테스트 신고 사유 1",
      },
      {
        hotelId: hotel._id,
        userId: anyUser._id,
        rating: 3,
        comment: "테스트 리뷰 2 - 보통이었습니다.",
        isReportedByUser: true,
        userReportReason: "테스트 신고 사유 2",
      },
      {
        hotelId: hotel._id,
        userId: anyUser._id,
        rating: 1,
        comment: "테스트 리뷰 3 - 별로였습니다.",
        isReportedByUser: false,
      },
    ];

    const created = await Review.insertMany(samples);
    console.log(`생성된 리뷰 개수: ${created.length}`);
    process.exit(0);
  } catch (err) {
    console.error("seedTestReviews 실행 중 오류:", err);
    process.exit(1);
  }
};

run();


