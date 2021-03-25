variable "aws_region" {
  default     = "us-west-2"
  description = "Which region should the resources be deployed into?"
}

variable "ecr_repo_url" {
  default     = "994750220687.dkr.ecr.us-west-2.amazonaws.com/ecr_sapien_demo:latest"
  description = "Which ecr repo you want to push your Docker image?"
}