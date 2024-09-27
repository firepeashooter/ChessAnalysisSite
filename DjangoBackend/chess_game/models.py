from django.db import models


class ChessGame(models.Model):

    # Automatically creates a unique id for the game
    id = models.AutoField(primary_key=True)
    accuracy = models.IntegerField()
    opening = models.CharField(max_length=255)
    outcome = models.CharField(max_length=255)
    loss_reason = models.CharField(max_length=255)
    Notes = models.TextField()

