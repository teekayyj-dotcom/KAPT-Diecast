variable "env" { type = string }
variable "project_name" { type = string }
variable "vpc_id" { type = string }
variable "private_subnets" { type = list(string) }
variable "eks_cluster_security_group_id" { type = string }
variable "tags" { type = map(string) }
