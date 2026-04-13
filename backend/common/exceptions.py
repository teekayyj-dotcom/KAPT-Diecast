import json

class APIException(Exception):
    """
    Lớp cơ sở cho tất cả các custom exceptions của dự án.
    Tự động format lỗi thành response chuẩn của AWS API Gateway.
    """
    def __init__(self, message, status_code=500):
        super().__init__(message)
        self.message = message
        self.status_code = status_code

    def to_response(self):
        """
        Chuyển đổi object lỗi thành dictionary để Lambda trả về API Gateway.
        Có sẵn cấu hình CORS headers.
        """
        return {
            "statusCode": self.status_code,
            "headers": {
                "Content-Type": "application/json",
                # Bật CORS để frontend (VD: React/Vue) có thể gọi được API
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": True
            },
            "body": json.dumps({
                "error": True,
                "message": self.message
            })
        }

class BadRequestException(APIException):
    """HTTP 400: Dữ liệu đầu vào từ client không hợp lệ (VD: thiếu trường productId)."""
    def __init__(self, message="Dữ liệu yêu cầu không hợp lệ"):
        super().__init__(message, 400)

class UnauthorizedException(APIException):
    """HTTP 401: Chưa đăng nhập hoặc token (JWT từ Cognito) không hợp lệ."""
    def __init__(self, message="Bạn cần đăng nhập để thực hiện hành động này"):
        super().__init__(message, 401)

class ForbiddenException(APIException):
    """HTTP 403: Đã đăng nhập nhưng không có quyền (VD: sửa giỏ hàng của người khác)."""
    def __init__(self, message="Bạn không có quyền truy cập tài nguyên này"):
        super().__init__(message, 403)

class NotFoundException(APIException):
    """HTTP 404: Không tìm thấy dữ liệu (VD: Xe diecast không tồn tại)."""
    def __init__(self, message="Không tìm thấy tài nguyên yêu cầu"):
        super().__init__(message, 404)

class InternalServerException(APIException):
    """HTTP 500: Lỗi từ phía server (VD: Lỗi kết nối DynamoDB)."""
    def __init__(self, message="Đã xảy ra lỗi hệ thống. Vui lòng thử lại sau."):
        super().__init__(message, 500)