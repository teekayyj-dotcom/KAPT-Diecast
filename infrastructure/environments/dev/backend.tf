terraform {
  backend "s3" {
    bucket         = "kapt-terraform-states"
    key            = "dev/terraform.tfstate"
    region         = "ap-south-1"
    dynamodb_table = "kapt-terraform-locks"
  }
}
