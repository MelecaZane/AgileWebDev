"""empty message

Revision ID: 4d4abacd2815
Revises: ba03fdc52ec2
Create Date: 2024-05-10 18:12:53.229331

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4d4abacd2815'
down_revision = 'ba03fdc52ec2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('post', schema=None) as batch_op:
        batch_op.add_column(sa.Column('found_player_list', sa.String(length=32), nullable=True))
        batch_op.alter_column('found_players',
               existing_type=sa.INTEGER(),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('post', schema=None) as batch_op:
        batch_op.alter_column('found_players',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.drop_column('found_player_list')

    # ### end Alembic commands ###
