from django.db import models


class ChessGame(models.Model):

    # Automatically creates a unique id for the game
    id = models.AutoField(primary_key=True)
