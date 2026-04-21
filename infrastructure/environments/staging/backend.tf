terraform {
  backend "s3" {
    bucket         = "my-tf-state-staging"
    key            = "staging/terraform.tfstate"
    region         = "ap-south-1"
  }
}
