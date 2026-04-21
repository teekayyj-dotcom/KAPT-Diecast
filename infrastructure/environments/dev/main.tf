locals {
  project_name = "kapt"
  env          = "dev"
  tags = {
    Project     = "Kapt Diecast"
    Environment = "Dev"
    Terraform   = "true"
  }
}

module "vpc" {
  source               = "../../modules/vpc"
  env                  = local.env
  project_name         = local.project_name
  cidr_block           = "10.0.0.0/16"
  availability_zones   = ["ap-south-1a", "ap-south-1b"]
  public_subnet_cidrs  = ["10.0.1.0/24", "10.0.2.0/24"]
  private_subnet_cidrs = ["10.0.10.0/24", "10.0.20.0/24"]
  tags                 = local.tags
}

module "eks" {
  source          = "../../modules/eks"
  env             = local.env
  project_name    = local.project_name
  vpc_id          = module.vpc.vpc_id
  private_subnets = module.vpc.private_subnets
  tags            = local.tags
}

module "rds" {
  source                        = "../../modules/rds"
  env                           = local.env
  project_name                  = local.project_name
  vpc_id                        = module.vpc.vpc_id
  private_subnets               = module.vpc.private_subnets
  eks_cluster_security_group_id = module.eks.cluster_security_group_id
  db_name                       = "diecast_db"
  db_username                   = "admin"
  db_password                   = var.db_password
  tags                          = local.tags
}

module "redis" {
  source                        = "../../modules/redis"
  env                           = local.env
  project_name                  = local.project_name
  vpc_id                        = module.vpc.vpc_id
  private_subnets               = module.vpc.private_subnets
  eks_cluster_security_group_id = module.eks.cluster_security_group_id
  tags                          = local.tags
}

module "s3" {
  source       = "../../modules/s3"
  env          = local.env
  project_name = local.project_name
}
