"""Initial_schema

Revision ID: 7cf474461fd9
Revises: 
Create Date: 2026-04-21 13:57:55.357041

"""
from typing import Sequence, Union

from alembic import op

from app.db.base import Base
from app.models import Blog, Poster, Product, User

# revision identifiers, used by Alembic.
revision: str = '7cf474461fd9'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    bind = op.get_bind()
    Base.metadata.create_all(bind=bind)


def downgrade() -> None:
    """Downgrade schema."""
    bind = op.get_bind()
    Base.metadata.drop_all(bind=bind)
