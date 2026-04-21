module "vpc" {
  source = "../../modules/vpc"
  env    = var.env
}

module "eks" {
  source = "../../modules/eks"
  env    = var.env
}

module "rds" {
  source = "../../modules/rds"
  env    = var.env
}
