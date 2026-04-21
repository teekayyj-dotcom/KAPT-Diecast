terraform {
  backend "s3" {
    bucket         = "my-tf-state-prod"
    key            = "prod/terraform.tfstate"
    region         = "ap-south-1"
  }
}
