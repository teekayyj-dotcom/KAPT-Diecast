from common.exceptions import UnauthorizedException

def get_user_id(event):
    """
    Trích xuất User ID (thường gọi là 'sub' trong chuẩn JWT) từ event của API Gateway.
    Sử dụng cho các service cần định danh người dùng (VD: CartService, OrderService).
    """
    try:
        # API Gateway đẩy các thông tin đã giải mã vào requestContext.authorizer.claims
        request_context = event.get('requestContext', {})
        authorizer = request_context.get('authorizer', {})
        
        # Tùy thuộc vào cấu hình authorizer, claims có thể nằm trực tiếp trong authorizer 
        # hoặc bên trong một key 'claims'
        claims = authorizer.get('claims') or authorizer
        
        # 'sub' (Subject) là ID duy nhất của user do Amazon Cognito cấp phát
        user_id = claims.get('sub')
        
        if not user_id:
            raise UnauthorizedException("Không tìm thấy định danh người dùng (sub) trong token.")
            
        return user_id
        
    except UnauthorizedException:
        raise
    except Exception as e:
        # Bắt các lỗi cấu trúc event không lường trước
        raise UnauthorizedException(f"Lỗi trích xuất thông tin xác thực: {str(e)}")

def get_user_email(event):
    """
    Trích xuất email của người dùng.
    Rất hữu ích cho OrderService để lấy email gửi thông báo xác nhận qua Amazon SNS/SES.
    """
    try:
        claims = event.get('requestContext', {}).get('authorizer', {}).get('claims', {}) or event.get('requestContext', {}).get('authorizer', {})
        
        email = claims.get('email')
        if not email:
             raise UnauthorizedException("Không tìm thấy email người dùng trong token.")
             
        return email
    except Exception as e:
        raise UnauthorizedException("Không thể lấy email người dùng từ request.")