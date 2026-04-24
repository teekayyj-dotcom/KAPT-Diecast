# KAPT Diecast E-commerce Platform

Video walkthrough: [Detailed project explanation video](https://buveduvn0-my.sharepoint.com/personal/kiet_lt_st_buv_edu_vn/_layouts/15/guestaccess.aspx?share=IQALpk_q61cnQaeJjJ9ux-72AXaKHxeeReyV-0_yj2zV9do&e=IEg5Z5)

This video explains the project in more detail and provides additional context for the main technical elements included in this submission.

KAPT Diecast is a cloud-oriented full-stack e-commerce project for selling diecast model cars. The repository combines a React frontend, a FastAPI backend, containerized local development, Kubernetes deployment manifests, Istio ingress routing, Terraform infrastructure as code, and a GitHub Actions based CI/CD pipeline.

This README documents the project in detail, including:

- System architecture
- Core business functionality
- Authentication and authorization flow
- Media upload and storage flow
- Local development workflow
- Containerization and deployment setup
- Kubernetes, Istio, and Terraform usage
- CI/CD pipeline behavior
- Known gaps and practical notes

## 1. Project Overview

At a high level, the system consists of:

- A customer-facing frontend built with React and Vite
- An admin dashboard for managing products, posters, blogs, and users
- A FastAPI backend exposing REST APIs
- A MySQL database for persistent business data
- AWS Cognito for authentication
- S3-compatible object storage for images
- AWS SES for order confirmation emails
- Docker Compose for local multi-service development
- Kubernetes and Istio for backend deployment and ingress routing
- Terraform for provisioning cloud infrastructure
- GitHub Actions for CI/CD automation

## 2. Repository Structure

```text
.
├── .github/workflows/ci.yml          # GitHub Actions CI/CD pipeline
├── backend/                          # FastAPI backend, Alembic migrations, Dockerfile
├── frontend/                         # React + Vite frontend
├── k8s/                              # Kubernetes base manifests and Istio manifests
├── infrastructure/                   # Terraform bootstrap, environments, and modules
├── docker-compose.yml                # Local multi-container development stack
└── README.md
```

## 3. Architecture Summary

### Frontend

The frontend is implemented with:

- React
- Vite
- React Router
- AWS Amplify Auth
- Context API for auth and cart state

It supports:

- Public customer pages
- Authentication pages
- A protected admin area

Key files:

- `frontend/src/App.jsx`
- `frontend/src/main.jsx`
- `frontend/src/context/AuthContext.jsx`
- `frontend/src/context/CartContext.jsx`
- `frontend/src/services/authService.js`
- `frontend/src/config/api.js`

### Backend

The backend is implemented with:

- FastAPI
- SQLAlchemy
- Pydantic
- Alembic
- boto3
- PyMySQL

The backend follows a layered structure:

- Routes: HTTP endpoints
- Services: business logic
- Repositories: database persistence
- Models: SQLAlchemy entities
- Schemas: request and response validation

Key files:

- `backend/app/main.py`
- `backend/app/api/router.py`
- `backend/app/api/routes/*.py`
- `backend/app/services/*.py`
- `backend/app/repositories/*.py`
- `backend/app/models/*.py`
- `backend/app/schemas/*.py`

### Infrastructure

The infrastructure layer includes:

- Local Docker Compose services
- Terraform-managed AWS resources
- Kubernetes deployment manifests
- Istio ingress resources

Key files:

- `docker-compose.yml`
- `backend/Dockerfile`
- `k8s/base/*.yaml`
- `k8s/istio/*.yaml`
- `infrastructure/bootstrap/main.tf`
- `infrastructure/environments/dev/*.tf`
- `infrastructure/modules/*/*.tf`

## 4. Core Business Functionality

This section documents the application behavior that is currently implemented in the codebase.

### 4.1 Product Catalog

Products are the core commerce entity of the system.

Implemented backend capabilities:

- List all products
- Search products by name
- Get one product by ID
- Create a new product
- Update an existing product
- Delete a product
- Upload a main product image
- Upload multiple gallery images

Product fields include:

- Name
- SKU
- Original car brand
- Diecast brand
- Scale
- Color
- Description
- Price
- Stock availability
- Main image URL
- Gallery image URLs

Relevant files:

- `backend/app/api/routes/products.py`
- `backend/app/services/product_service.py`
- `backend/app/repositories/product_repository.py`
- `backend/app/models/product.py`
- `backend/app/schemas/product.py`

Frontend product functionality:

- Product listing page
- Client-side filtering by price, original brand, diecast brand, scale, and color
- Product detail page with image switching
- Add to cart from list view and detail view
- Related products section on detail page

Relevant files:

- `frontend/src/pages/ProductPage.jsx`
- `frontend/src/pages/Product-detail.jsx`
- `frontend/src/components/ui/ProductCard.jsx`
- `frontend/src/constants/productOptions.js`

### 4.2 Cart Management

The cart is managed entirely on the frontend using React context and browser local storage.

Implemented cart capabilities:

- Add a product to cart
- Increase quantity for an existing cart item
- Remove a product from cart
- Update quantity directly
- Clear the cart
- Persist cart state across page reloads
- Calculate subtotal and total item count

Notes:

- Cart persistence is handled by local storage
- Legacy local storage keys are cleaned up automatically

Relevant files:

- `frontend/src/context/CartContext.jsx`
- `frontend/src/pages/Cart.jsx`

### 4.3 Checkout and Order Creation

Checkout is implemented as a guest checkout flow.

Implemented checkout capabilities:

- Collect billing and shipping information
- Convert cart items into an order payload
- Send the payload to the backend order endpoint
- Persist entered checkout form values in local storage
- Show success and error messages in the UI

Implemented backend order capabilities:

- Create a unique order number
- Store the order in MySQL
- Store nested order items linked to the order
- Mark payment as a successful test payment
- Mark order status as confirmed
- Trigger a confirmation email through AWS SES
- Return whether the email was sent successfully

Relevant files:

- `frontend/src/pages/CheckoutPage.jsx`
- `backend/app/api/routes/orders.py`
- `backend/app/services/order_service.py`
- `backend/app/models/order.py`
- `backend/app/models/order_item.py`
- `backend/app/schemas/order.py`
- `backend/app/services/notification_service.py`

Important implementation note:

- The payment flow is currently mocked. Orders are created and marked as paid without integrating a real payment gateway.

### 4.4 Blog Management

The system supports basic blog content management.

Implemented backend capabilities:

- List blogs
- Search blogs by title
- Get one blog by ID
- Create blog entries
- Update blog entries
- Delete blog entries
- Upload a featured image for a blog post

Relevant files:

- `backend/app/api/routes/blogs.py`
- `backend/app/services/blog_service.py`
- `backend/app/repositories/blog_repository.py`
- `backend/app/models/blog.py`
- `backend/app/schemas/blog.py`

Frontend note:

- The public blog page currently uses mostly static marketing-style content
- The backend blog APIs and admin blog screens represent the dynamic CMS-oriented part of the implementation

Relevant files:

- `frontend/src/pages/Blog.jsx`
- `frontend/src/pages_admin/Blogs.jsx`
- `frontend/src/pages_admin/AddBlog.jsx`
- `frontend/src/pages_admin/EditBlog.jsx`

### 4.5 Poster Management

Posters appear to represent configurable visual banner or promotional assets.

Implemented capabilities:

- List posters
- Get poster by ID
- Create posters
- Update posters
- Delete posters
- Upload poster thumbnail images

Relevant files:

- `backend/app/api/routes/posters.py`
- `backend/app/services/poster_service.py`
- `backend/app/repositories/poster_repository.py`
- `backend/app/models/poster.py`
- `backend/app/schemas/poster.py`

Admin UI files:

- `frontend/src/pages_admin/Posters.jsx`
- `frontend/src/pages_admin/AddPoster.jsx`
- `frontend/src/pages_admin/EditPoster.jsx`

### 4.6 User Management

The system maintains an internal `users` table separate from Cognito.

Implemented capabilities:

- List users
- Search users
- Filter users by role and status
- Get user by ID
- Create users
- Update users
- Delete users

Relevant files:

- `backend/app/api/routes/users.py`
- `backend/app/services/user_service.py`
- `backend/app/repositories/user_repository.py`
- `backend/app/models/user.py`
- `backend/app/schemas/user.py`

Admin UI files:

- `frontend/src/pages_admin/Users.jsx`
- `frontend/src/pages_admin/AddUser.jsx`
- `frontend/src/pages_admin/EditUser.jsx`

### 4.7 Authentication and Authorization

Authentication is split into two responsibilities:

- AWS Cognito handles user identity
- The application database handles app-specific users and roles

Implemented frontend auth capabilities:

- Email sign-up with Cognito
- Email confirmation
- Email sign-in
- Google sign-in via Cognito redirect
- Session retrieval through Amplify
- Sync authenticated user to backend
- Protected admin routes

Implemented backend auth capabilities:

- Verify Cognito ID tokens
- Retrieve Cognito JWKS
- Validate issuer, audience, signing key, and token type
- Map Cognito identity into internal `users` records
- Promote the configured bootstrap admin email to admin role

Relevant frontend files:

- `frontend/src/amplifyAuth.js`
- `frontend/src/services/authService.js`
- `frontend/src/context/AuthContext.jsx`
- `frontend/src/components/ProtectedRoute.jsx`
- `frontend/src/pages_auth/Login.jsx`
- `frontend/src/pages_auth/Signup.jsx`

Relevant backend files:

- `backend/app/cognito_auth.py`
- `backend/app/core/dependencies.py`
- `backend/app/services/auth_service.py`
- `backend/app/api/routes/auth.py`

Role behavior:

- Admin access is enforced in the frontend protected route
- Admin users are determined by backend role sync and fallback email matching logic

Relevant file:

- `frontend/src/utils/roles.js`

### 4.8 Media Upload and Object Storage

The project supports file uploads for products, blogs, and posters.

Implemented media behavior:

- Accept uploaded file streams through FastAPI
- Generate UUID-based file names
- Upload files to S3 or a compatible endpoint such as LocalStack
- Return a public URL for saved assets
- Support separate storage prefixes by entity type

Relevant files:

- `backend/app/utils/storage.py`
- `backend/app/api/routes/products.py`
- `backend/app/api/routes/blogs.py`
- `backend/app/api/routes/posters.py`

Storage target behavior:

- Local development can target LocalStack through `AWS_ENDPOINT_URL`
- Cloud deployment can target real S3
- Public asset delivery can use the S3 bucket domain if configured

### 4.9 Health and Bootstrap Behavior

The backend includes simple health endpoints and startup bootstrap behavior.

Implemented behavior:

- Root API status endpoint
- Dedicated health endpoint
- Table creation on startup
- Legacy schema compatibility adjustments for older product table columns
- Default admin account bootstrap

Relevant files:

- `backend/app/api/routes/health.py`
- `backend/app/db/bootstrap.py`
- `backend/app/main.py`

## 5. Database and Persistence

### MySQL

The primary persistent data store is MySQL.

Entities represented in the backend include:

- Users
- Products
- Blogs
- Posters
- Orders
- Order items

Relevant files:

- `backend/app/models/*.py`
- `backend/app/db/session.py`
- `backend/app/core/config.py`

### Alembic

Alembic is used for schema migration.

Migration files currently present:

- `backend/migrations/versions/7cf474461fd9_initial_schema.py`
- `backend/migrations/versions/cc2d9f7b1f6e_add_cognito_sub_to_users.py`

Notes:

- The app also contains runtime bootstrap logic for schema compatibility
- This means the project currently uses both migration-based schema evolution and startup compatibility logic

## 6. Local Development Workflow

Local development is designed as a multi-service workflow.

### 6.1 Local Services

Defined in `docker-compose.yml`:

- `api` for the FastAPI backend
- `db` for MySQL
- `localstack` for AWS-compatible local services
- `redis` for in-memory data infrastructure
- `kafka` for event infrastructure readiness

Relevant file:

- `docker-compose.yml`

### 6.2 Backend Container

The backend container:

- Builds from `backend/Dockerfile`
- Uses a multi-stage build
- Builds Python wheels in the builder stage
- Uses a smaller runtime image
- Runs as a non-root user
- Starts Uvicorn on port 8000

Relevant file:

- `backend/Dockerfile`

### 6.3 Frontend Local Run

The frontend is run separately with Vite.

Commands:

```bash
cd frontend
npm install
npm run dev
```

Relevant file:

- `frontend/package.json`

### 6.4 Backend Local Run

Typical local backend stack:

```bash
docker compose up --build
```

This starts:

- The backend on `http://localhost:8001`
- MySQL on port `3307`
- LocalStack on port `4566`
- Redis on port `6379`
- Kafka on port `9092`

### 6.5 Frontend-to-Backend Connection

The frontend resolves the API base URL dynamically.

Behavior:

- Local browser access uses `http://localhost:8001`
- Production browser access defaults to `https://api.teekayyj.id.vn`
- `VITE_API_BASE_URL` can override the default

Relevant file:

- `frontend/src/config/api.js`

### 6.6 Runtime Configuration

The backend loads environment variables through `backend/app/core/config.py`.

Important runtime values include:

- MySQL host, user, password, database, port
- Redis host and port
- S3 bucket and endpoint
- Cognito user pool settings
- SES sender email
- Bootstrap admin email

Relevant file:

- `backend/app/core/config.py`

## 7. Containerization

The project is partially containerized around the backend service.

### Backend Dockerfile Design

The backend Dockerfile uses:

- A builder image to prepare Python dependency wheels
- A runtime image for execution
- Slim Python images for a smaller base
- Explicit runtime packages for MySQL support
- A non-root runtime user

Benefits:

- Smaller final image
- Cleaner dependency installation
- Better security posture
- More production-friendly build process

Relevant file:

- `backend/Dockerfile`

### Docker Compose Purpose

Docker Compose is used for:

- Local orchestration
- Dependency bootstrapping
- Running supporting services consistently
- Mounting backend code into the container for development

Relevant file:

- `docker-compose.yml`

## 8. Kubernetes Deployment

The backend is designed to run on Kubernetes.

### 8.1 Deployment

The main backend deployment:

- Deploys the `kapt-api` application
- Runs 3 replicas
- Uses rolling updates
- Defines CPU and memory requests and limits
- Uses readiness and liveness probes
- Injects configuration through ConfigMap and Secret
- Mounts Firebase credentials as a Kubernetes secret volume

Relevant file:

- `k8s/base/deployment.yaml`

### 8.2 Service

The service exposes the backend internally inside the cluster.

Characteristics:

- Type `ClusterIP`
- Named service `kapt-api-service`
- Routes traffic to pods with label `app: kapt-api`

Relevant file:

- `k8s/base/service.yaml`

### 8.3 ConfigMap and Secret

Runtime configuration is split between:

- ConfigMap for non-sensitive values
- Secret for sensitive values

ConfigMap includes examples of:

- App metadata
- RDS endpoint
- Redis endpoint
- AWS region
- S3 bucket information
- SES sender address

Secret includes examples of:

- MySQL credentials
- AWS credentials placeholders

Relevant files:

- `k8s/base/configmap.yaml`
- `k8s/base/secret.yaml`

### 8.4 Alembic Migration Job

There is a Kubernetes batch job manifest intended to run Alembic migrations.

Purpose:

- Upgrade schema separately from normal app startup
- Support explicit schema management during deployment

Relevant file:

- `k8s/base/alembic-job.yaml`

### 8.5 Kustomize

Kustomize is used to compose the base resources and manage image tags.

Relevant file:

- `k8s/base/kustomization.yaml`

## 9. Istio Ingress and Routing

Istio resources are used to expose the backend externally.

### Implemented Istio Resources

- Gateway
- VirtualService
- Domain-specific API routing

Behavior:

- Accept incoming HTTP traffic through the Istio ingress gateway
- Route external traffic to the `kapt-api-service`
- Support routing by host and path

Relevant files:

- `k8s/istio/gateway.yaml`
- `k8s/istio/virtual-service.yaml`
- `k8s/istio/istio-api-routing.yaml`
- `k8s/istio/kustomization.yaml`

## 10. Terraform Infrastructure

Terraform is used to provision cloud infrastructure.

### 10.1 Bootstrap State Infrastructure

The bootstrap configuration provisions:

- An S3 bucket for Terraform remote state
- Versioning for the state bucket
- Server-side encryption for the state bucket
- A DynamoDB table for state locking

Relevant file:

- `infrastructure/bootstrap/main.tf`

### 10.2 Development Environment

The development environment provisions:

- VPC
- EKS cluster
- RDS MySQL database
- Redis cluster
- S3 bucket

Relevant files:

- `infrastructure/environments/dev/main.tf`
- `infrastructure/environments/dev/variables.tf`
- `infrastructure/environments/dev/outputs.tf`
- `infrastructure/environments/dev/backend.tf`

### 10.3 Terraform Modules

Reusable modules present in the repository:

- VPC module
- EKS module
- RDS module
- Redis module
- S3 module

Relevant files:

- `infrastructure/modules/vpc/main.tf`
- `infrastructure/modules/eks/main.tf`
- `infrastructure/modules/rds/main.tf`
- `infrastructure/modules/redis/main.tf`
- `infrastructure/modules/s3/main.tf`

### Environment Notes

The `dev` environment is the most complete environment in the repository.

`staging` and `prod` environment folders exist, but their current Terraform definitions are much lighter than `dev`.

## 11. CI/CD Pipeline

The repository contains a GitHub Actions workflow that implements the current CI/CD pipeline.

Relevant file:

- `.github/workflows/ci.yml`

### 11.1 Trigger Conditions

The workflow triggers on:

- Push to `main`
- Pull request targeting `main`

Workflow name:

- `E-commerce CI/CD`

### 11.2 Pipeline Overview

The workflow contains two main jobs:

- `backend-test-and-build`
- `frontend-build-and-deploy`

This means backend and frontend delivery are handled separately inside the same workflow.

### 11.3 Backend Pipeline

The backend job performs the following steps:

1. Check out the repository
2. Set up Python 3.11
3. Install backend dependencies from `backend/requirements.txt`
4. Run a placeholder backend test step
5. Configure AWS credentials from GitHub Secrets
6. Log in to Amazon ECR
7. Build the backend Docker image
8. Tag the image with the Git commit SHA
9. Push the image to ECR
10. On `push` events only, set up `kubectl`
11. On `push` events only, update kubeconfig for EKS
12. On `push` events only, sync Kubernetes backend secret from GitHub Secrets
13. On `push` events only, run Alembic migrations as a Kubernetes Job
14. On `push` events only, update the running Kubernetes deployment image
15. Wait for rollout completion and collect diagnostics on failure

Backend delivery target:

- Amazon ECR for image storage
- Amazon EKS for runtime deployment

Image tagging strategy:

- Docker image tag = `${{ github.sha }}`

Kubernetes deployment target:

- Deployment name: `kapt-api`
- Container name updated: `fastapi-app`

Migration strategy:

- A Kubernetes Job is created dynamically
- The job runs `python -m alembic upgrade head`
- The job consumes `kapt-config` and `kapt-secret`

Diagnostics behavior:

- On migration failure, the workflow collects job, pod, describe, and log output
- On rollout failure, the workflow collects deployment and pod diagnostics

### 11.4 Frontend Pipeline

The frontend job performs the following steps:

1. Check out the repository
2. Set up Node.js 20
3. Install frontend dependencies with `npm install`
4. Build the frontend using Vite
5. Configure AWS credentials
6. Sync the built `frontend/dist` directory to S3
7. Invalidate CloudFront cache

Frontend delivery target:

- S3 bucket for static website assets
- CloudFront for CDN delivery and cache invalidation

Build-time environment variables injected into the frontend include:

- `VITE_API_BASE_URL`
- `VITE_COGNITO_USER_POOL_ID`
- `VITE_COGNITO_CLIENT_ID`
- `VITE_COGNITO_REGION`
- `VITE_COGNITO_DOMAIN`
- `VITE_COGNITO_SIGN_IN_REDIRECT_URL`
- `VITE_COGNITO_SIGN_OUT_REDIRECT_URL`
- Production redirect URL variants
- `VITE_GOOGLE_CLIENT_ID`

### 11.5 GitHub Secrets and Variables Used

The workflow expects a mixture of GitHub Secrets and GitHub Variables.

Secrets used:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `MYSQL_USER`
- `MYSQL_PASSWORD`

Variables used:

- `EKS_CLUSTER_NAME`
- `K8S_NAMESPACE`
- `VITE_API_BASE_URL`
- `VITE_COGNITO_USER_POOL_ID`
- `VITE_COGNITO_CLIENT_ID`
- `VITE_COGNITO_REGION`
- `VITE_COGNITO_DOMAIN`
- `VITE_COGNITO_SIGN_IN_REDIRECT_URL`
- `VITE_COGNITO_SIGN_OUT_REDIRECT_URL`
- `VITE_COGNITO_SIGN_IN_REDIRECT_URL_PROD`
- `VITE_COGNITO_SIGN_OUT_REDIRECT_URL_PROD`
- `VITE_GOOGLE_CLIENT_ID`

### 11.6 Practical CI/CD Behavior

In practice, the current pipeline behaves like this:

- Pull requests to `main` run build-oriented CI behavior
- Pushes to `main` run both build and deployment behavior
- The backend is delivered as a Docker image to ECR and then rolled out on EKS
- The frontend is delivered as static assets to S3 and then exposed via CloudFront
- Database migration is included as part of the backend deployment flow

### 11.7 Current CI/CD Limitations

The current pipeline is useful and operational, but it has some important limitations:

- Backend tests are not actually implemented yet; the workflow explicitly skips them
- There is no separate lint job for backend or frontend in the workflow
- There is no explicit Terraform apply stage in GitHub Actions
- There is no staged environment promotion workflow in the current CI/CD config
- There is no Helm-based deployment packaging
- Frontend deployment appears to run for both pull requests and pushes, which may not always be desirable in a production setup

These are not failures of the project, but they are important to document honestly.

## 12. Deployment Targets in the Current Design

From the current repository and CI/CD setup, the intended deployment targets are:

### Backend

- Build container image
- Push to Amazon ECR
- Run on Amazon EKS
- Use MySQL on RDS
- Use Redis on ElastiCache
- Use S3 for media
- Use SES for email

### Frontend

- Build static site with Vite
- Upload assets to S3
- Serve through CloudFront

### Networking

- Use Istio gateway and virtual services for backend ingress

## 13. Environment and Configuration Summary

### Frontend Environment Variables

Common frontend variables:

- `VITE_API_BASE_URL`
- `VITE_COGNITO_USER_POOL_ID`
- `VITE_COGNITO_CLIENT_ID`
- `VITE_COGNITO_REGION`
- `VITE_COGNITO_DOMAIN`
- `VITE_COGNITO_SIGN_IN_REDIRECT_URL`
- `VITE_COGNITO_SIGN_OUT_REDIRECT_URL`
- `VITE_COGNITO_SIGN_IN_REDIRECT_URL_PROD`
- `VITE_COGNITO_SIGN_OUT_REDIRECT_URL_PROD`
- `VITE_GOOGLE_CLIENT_ID`

### Backend Environment Variables

Common backend variables:

- `APP_NAME`
- `APP_VERSION`
- `MYSQL_USER`
- `MYSQL_PASSWORD`
- `MYSQL_HOST`
- `MYSQL_PORT`
- `MYSQL_DATABASE`
- `REDIS_HOST`
- `REDIS_PORT`
- `GOOGLE_APPLICATION_CREDENTIALS`
- `BOOTSTRAP_ADMIN_EMAIL`
- `COGNITO_USER_POOL_ID`
- `COGNITO_CLIENT_ID`
- `COGNITO_REGION`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `S3_BUCKET_NAME`
- `S3_BUCKET_DOMAIN_NAME`
- `AWS_ENDPOINT_URL`
- `SES_SENDER_EMAIL`

Relevant file:

- `backend/app/core/config.py`

## 14. Known Gaps and Important Notes

The repository is substantial, but some areas are still evolving.

Important notes:

- Backend unit tests are not configured yet in CI
- Some frontend public pages still contain static or placeholder marketing content
- Some admin pages are complete for CRUD, while others are placeholders
- Redis and Kafka are provisioned in local/dev architecture but are not yet deeply integrated into business logic
- `staging` and `prod` Terraform environments are lighter than `dev`
- The backend includes both Alembic migrations and runtime schema compatibility logic
- There is a `backend/serverless.yml` file describing a serverless-oriented design, but the main deployed architecture in this repo is container-based

## 15. Suggested Local Run Commands

### Start backend and local infrastructure

```bash
docker compose up --build
```

### Start frontend

```bash
cd frontend
npm install
npm run dev
```

### Build frontend manually

```bash
cd frontend
npm run build
```

### Install backend dependencies locally without Docker

```bash
cd backend
pip install -r requirements.txt
```

## 16. Main Files to Review Quickly

If you need a fast technical tour of the project, review these files first:

- `docker-compose.yml`
- `backend/Dockerfile`
- `.github/workflows/ci.yml`
- `backend/app/main.py`
- `backend/app/core/config.py`
- `backend/app/db/bootstrap.py`
- `backend/app/api/router.py`
- `backend/app/api/routes/products.py`
- `backend/app/api/routes/orders.py`
- `backend/app/services/order_service.py`
- `backend/app/services/notification_service.py`
- `backend/app/cognito_auth.py`
- `backend/app/utils/storage.py`
- `frontend/src/App.jsx`
- `frontend/src/context/AuthContext.jsx`
- `frontend/src/context/CartContext.jsx`
- `frontend/src/services/authService.js`
- `frontend/src/pages/ProductPage.jsx`
- `frontend/src/pages/CheckoutPage.jsx`
- `k8s/base/deployment.yaml`
- `k8s/istio/istio-api-routing.yaml`
- `infrastructure/environments/dev/main.tf`

## 17. Final Summary

KAPT Diecast is more than a CRUD application. It is a cloud-focused e-commerce project that demonstrates:

- Customer and admin-facing frontend flows
- A layered FastAPI backend
- Internal user synchronization on top of Cognito
- Cart and checkout behavior
- Order persistence and SES email notification
- Media uploads to S3-compatible storage
- Multi-service local development with Docker Compose
- Containerized backend delivery
- Kubernetes deployment with config and secret separation
- Istio-based ingress routing
- Terraform-managed AWS infrastructure
- GitHub Actions based CI/CD for both backend and frontend delivery

For coursework, demos, or technical handoff, this repository provides a strong example of combining software engineering, DevOps, and cloud deployment practices in one project.
