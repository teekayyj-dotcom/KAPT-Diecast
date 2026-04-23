resource "aws_security_group" "rds_sg" {
  name        = "${var.project_name}-rds-sg-${var.env}"
  description = "Allow DB access from EKS"
  vpc_id      = var.vpc_id

  ingress {
    from_port       = 3306
    to_port         = 3306
    protocol        = "tcp"
    cidr_blocks     = ["10.0.0.0/16"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = var.tags
}

module "db" {
  source  = "terraform-aws-modules/rds/aws"
  version = "~> 6.0"

  identifier = "${var.project_name}-db-${var.env}"

  engine               = "mysql"
  engine_version       = "8.0"
  family               = "mysql8.0"
  major_engine_version = "8.0"
  instance_class       = "db.t3.micro"

  allocated_storage     = 20
  max_allocated_storage = 100

  db_name  = var.db_name
  username = var.db_username
  port     = 3306
  manage_master_user_password = false
  password = var.db_password

  multi_az               = false
  create_db_subnet_group = true
  subnet_ids             = var.private_subnets
  vpc_security_group_ids = [aws_security_group.rds_sg.id]

  skip_final_snapshot = true

  tags = var.tags
}
