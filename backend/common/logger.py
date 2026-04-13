import logging
import json
import os
from datetime import datetime

class JsonFormatter(logging.Formatter):
    """
    Custom formatter để chuyển đổi log output sang định dạng JSON.
    Rất hữu ích khi truy vấn trên AWS CloudWatch Logs Insights.
    """
    def format(self, record):
        log_record = {
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "level": record.levelname,
            "logger_name": record.name,
            "message": record.getMessage(),
        }
        
        # Nếu có truyền thêm extra data (ví dụ: user_id, order_id)
        if hasattr(record, 'extra_data'):
            log_record['extra_data'] = record.extra_data
            
        # Nếu có lỗi exception (traceback)
        if record.exc_info:
            log_record['exception'] = self.formatException(record.exc_info)
            
        return json.dumps(log_record)

def get_logger(name):
    """
    Hàm khởi tạo và trả về một instance logger.
    """
    logger = logging.getLogger(name)
    
    # Môi trường Lambda thường giữ lại container giữa các lần gọi (warm start).
    # Kiểm tra handlers để tránh tình trạng log bị lặp đúp nhiều lần.
    if not logger.handlers:
        handler = logging.StreamHandler()
        handler.setFormatter(JsonFormatter())
        logger.addHandler(handler)
        
    # Cho phép điều chỉnh mức độ log qua biến môi trường (mặc định là INFO)
    log_level_str = os.environ.get("LOG_LEVEL", "INFO").upper()
    log_level = getattr(logging, log_level_str, logging.INFO)
    logger.setLevel(log_level)
    
    # Ngăn không cho log bị đẩy lên root logger của Lambda (tránh duplicate format)
    logger.propagate = False 
    
    return logger