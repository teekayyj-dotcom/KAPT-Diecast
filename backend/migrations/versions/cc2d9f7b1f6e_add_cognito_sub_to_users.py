"""Add cognito_sub to users

Revision ID: cc2d9f7b1f6e
Revises: 7cf474461fd9
Create Date: 2026-04-23 23:40:00.000000

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "cc2d9f7b1f6e"
down_revision: Union[str, Sequence[str], None] = "7cf474461fd9"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column("users", sa.Column("cognito_sub", sa.String(length=128), nullable=True))
    op.create_index(op.f("ix_users_cognito_sub"), "users", ["cognito_sub"], unique=True)


def downgrade() -> None:
    op.drop_index(op.f("ix_users_cognito_sub"), table_name="users")
    op.drop_column("users", "cognito_sub")
