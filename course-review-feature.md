Pull Request: Add Course Review & Rating Feature
Overview
Đề xuất bổ sung chức năng Review & Rating cho hệ thống Quản Lý Khóa Học.
Hiện tại hệ thống đã hỗ trợ:
•	Đăng ký khóa học
•	Quản lý bài học
•	Nộp bài tập
•	Chấm điểm
•	Thanh toán
•	Thảo luận khóa học
Tuy nhiên hệ thống chưa có chức năng cho phép học viên đánh giá chất lượng khóa học sau khi tham gia. Điều này làm giảm khả năng thu thập phản hồi từ người học và gây khó khăn cho việc cải thiện nội dung khóa học.
Proposed Feature
Bổ sung chức năng Review & Rating cho từng khóa học.
Chức năng chính
•	Học viên đánh giá khóa học từ 1 đến 5 sao.
•	Học viên viết nhận xét về khóa học.
•	Hiển thị điểm đánh giá trung bình của khóa học.
•	Hiển thị danh sách đánh giá của học viên.
•	Cho phép học viên chỉnh sửa hoặc xóa đánh giá của mình.
•	Giáo viên và Admin có thể xem toàn bộ đánh giá.
Database Design
Bảng reviews
CREATE TABLE reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    course_id INT NOT NULL,
    user_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (course_id) REFERENCES courses(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
API Endpoints
Create Review
POST /api/reviews
Request Body:
{
    "courseId": 1,
    "rating": 5,
    "comment": "Khóa học rất hay và dễ hiểu"
}
Get Reviews By Course
GET /api/reviews/course/:courseId
Update Review
PUT /api/reviews/:id
Delete Review
DELETE /api/reviews/:id
Get Average Rating
GET /api/reviews/course/:courseId/average
Business Rules
1.	Chỉ học viên đã đăng ký khóa học mới được đánh giá.
2.	Mỗi học viên chỉ được đánh giá một lần cho mỗi khóa học.
3.	Học viên có thể cập nhật hoặc xóa đánh giá của mình.
4.	Rating chỉ được nhập từ 1 đến 5.
5.	Hệ thống tự động tính điểm đánh giá trung bình của khóa học.
6.	Teacher và Admin được xem tất cả đánh giá.
Expected Benefits
•	Tăng tính tương tác giữa học viên và giảng viên.
•	Giúp cải thiện chất lượng khóa học.
•	Hỗ trợ học viên lựa chọn khóa học phù hợp.
•	Tăng tính thực tế và chuyên nghiệp cho hệ thống E-Learning.
Future Improvements
•	Like/Dislike Review.
•	Báo cáo Review vi phạm.
•	Hiển thị biểu đồ đánh giá theo số sao.
•	Cho phép đính kèm hình ảnh khi đánh giá.
•	Hiển thị Top khóa học được đánh giá cao nhất.

