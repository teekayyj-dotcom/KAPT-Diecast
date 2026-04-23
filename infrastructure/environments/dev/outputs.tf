output "eks_cluster_name" {
  value = module.eks.cluster_name
}

output "rds_endpoint" {
  value = module.rds.db_instance_address
}

output "rds_port" {
  value = 3306
}

output "rds_database_name" {
  value = "diecast_db"
}

output "rds_master_username" {
  value = "admin"
}

output "redis_endpoint" {
  value = module.redis.redis_endpoint
}

output "redis_port" {
  value = module.redis.redis_port
}

output "s3_bucket_name" {
  value = module.s3.bucket_name
}

output "s3_bucket_domain_name" {
  value = module.s3.bucket_domain_name
}
