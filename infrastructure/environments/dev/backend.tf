terraform {
  backend "s3" {
    bucket         = "my-tf-state-dev"
    key            = "dev/terraform.tfstate"
    region         = "ap-south-1"
  }
}
