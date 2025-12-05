import axiosClient from "./axiosClient";

export const adminRoomApi = {
  // [사업자] 특정 호텔의 객실 목록 조회
  getRoomsByHotel: (hotelId) => {
    return axiosClient.get(`/room/owner/hotel/${hotelId}`);
  },
  // [사업자] 객실 생성
  createRoom: (hotelId, data) => {
    return axiosClient.post(`/room/owner/${hotelId}`, data);
  },
  // [사업자] 객실 수정
  updateRoom: (roomId, data) => {
    return axiosClient.patch(`/room/owner/${roomId}`, data);
  },
  // [사업자] 객실 삭제
  deleteRoom: (roomId) => {
    return axiosClient.delete(`/room/owner/${roomId}`);
  }
};

export default adminRoomApi;