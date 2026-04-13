import os
import boto3
from botocore.exceptions import ClientError

# Khởi tạo resource DynamoDB ở global scope để tái sử dụng connection giữa các lần invoke Lambda.
# Điều này giúp giảm thiểu độ trễ đáng kể.
dynamodb = boto3.resource('dynamodb')

def get_table(env_var_name):
    """Hàm helper để khởi tạo object Table từ biến môi trường"""
    table_name = os.environ.get(env_var_name)
    if not table_name:
        raise ValueError(f"Thiếu cấu hình biến môi trường: {env_var_name}")
    return dynamodb.Table(table_name)

# --- Các hàm cung cấp Table Object cho từng Service ---

def get_products_table():
    """Bảng quản lý danh mục sản phẩm [cite: 99, 100]"""
    return get_table('PRODUCTS_TABLE')

def get_carts_table():
    """Bảng quản lý giỏ hàng với tính năng TTL tự động xóa [cite: 101, 102]"""
    return get_table('CARTS_TABLE')

def get_orders_table():
    """Bảng lưu trữ thông tin tổng quan của đơn hàng [cite: 103, 104]"""
    return get_table('ORDERS_TABLE')

def get_order_items_table():
    """Bảng lưu trữ chi tiết các mẫu xe diecast trong từng đơn hàng [cite: 103, 104]"""
    return get_table('ORDER_ITEMS_TABLE')


# --- Các hàm helper hỗ trợ thao tác CRUD cơ bản ---

def get_item_safe(table, key):
    """
    Lấy một item an toàn, đã bọc sẵn xử lý lỗi ClientError của boto3.
    Giúp code ở tầng Service sạch sẽ hơn, không phải try/except liên tục.
    """
    try:
        response = table.get_item(Key=key)
        return response.get('Item')
    except ClientError as e:
        # Ở bước sau, chúng ta sẽ tích hợp common/logger.py vào đây
        error_msg = e.response['Error']['Message']
        print(f"Lỗi khi đọc bảng {table.table_name}: {error_msg}")
        return None

def put_item_safe(table, item):
    """Thêm mới hoặc ghi đè một item một cách an toàn"""
    try:
        table.put_item(Item=item)
        return True
    except ClientError as e:
        error_msg = e.response['Error']['Message']
        print(f"Lỗi khi ghi vào bảng {table.table_name}: {error_msg}")
        return False