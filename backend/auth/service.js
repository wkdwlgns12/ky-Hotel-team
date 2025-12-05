import User from "../user/model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import axios from "axios";

// 토큰 생성 헬퍼
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" }
  );
};

// 일반 로그인
export const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("INVALID_CREDENTIALS");

  // 소셜 로그인 유저가 비밀번호 로그인을 시도할 경우 방어
  if (user.provider !== "local" && !user.password) {
     throw new Error(`이 계정은 ${user.provider} 로그인으로 가입되었습니다.`);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("INVALID_CREDENTIALS");

  return { user, token: generateToken(user) };
};

// 회원가입
export const register = async (userData) => {
  const { name, email, password, role, phone, businessNumber } = userData;
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("EMAIL_ALREADY_EXISTS");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || "user",
    phone,
    businessNumber,
    provider: "local",
  });

  return { user, token: generateToken(user) };
};

// --- 소셜 로그인 서비스 로직 ---

// 공통: DB 사용자 찾기 또는 생성
const findOrCreateSocialUser = async (profile) => {
  let user = await User.findOne({ email: profile.email });
  
  if (!user) {
    // 신규 가입 (비밀번호 없음)
    user = await User.create({
      name: profile.name,
      email: profile.email,
      role: "user", // 기본값 유저
      provider: profile.provider,
      snsId: profile.snsId,
    });
  } else {
    // 기존 유저라면 provider 정보 업데이트 등 필요 시 수행
    if (user.provider === 'local') {
       // 로컬 계정이 이미 있는 경우 병합하거나 에러 처리 (여기선 그냥 진행)
    }
  }
  return { user, token: generateToken(user) };
};

// 1. 카카오
export const kakaoLoginService = async (code) => {
  // 토큰 받기
  const tokenRes = await axios.post("https://kauth.kakao.com/oauth/token", null, {
    params: {
      grant_type: "authorization_code",
      client_id: process.env.KAKAO_CLIENT_ID,
      client_secret: process.env.KAKAO_CLIENT_SECRET,
      redirect_uri: process.env.KAKAO_REDIRECT_URI,
      code,
    },
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  const { access_token } = tokenRes.data;

  // 유저 정보 받기
  const userRes = await axios.get("https://kapi.kakao.com/v2/user/me", {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  const kakaoAccount = userRes.data.kakao_account;
  const profile = {
    provider: "kakao",
    snsId: userRes.data.id.toString(),
    email: kakaoAccount.email,
    name: kakaoAccount.profile?.nickname || "Kakao User",
  };

  return findOrCreateSocialUser(profile);
};

// 2. 네이버
export const naverLoginService = async (code, state) => {
  const tokenRes = await axios.get("https://nid.naver.com/oauth2.0/token", {
    params: {
      grant_type: "authorization_code",
      client_id: process.env.NAVER_CLIENT_ID,
      client_secret: process.env.NAVER_CLIENT_SECRET,
      code,
      state,
    },
  });

  const { access_token } = tokenRes.data;

  const userRes = await axios.get("https://openapi.naver.com/v1/nid/me", {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  const response = userRes.data.response;
  const profile = {
    provider: "naver",
    snsId: response.id,
    email: response.email,
    name: response.name || "Naver User",
  };

  return findOrCreateSocialUser(profile);
};

// 3. 구글
export const googleLoginService = async (code) => {
  const tokenRes = await axios.post("https://oauth2.googleapis.com/token", {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    grant_type: "authorization_code",
  });

  const { access_token } = tokenRes.data;

  const userRes = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  const profile = {
    provider: "google",
    snsId: userRes.data.id,
    email: userRes.data.email,
    name: userRes.data.name || "Google User",
  };

  return findOrCreateSocialUser(profile);
};