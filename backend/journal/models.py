from django.db import models
from crags.models import Crag, Route
from users.models import User


class AscentType(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=32)

    class Meta:
        managed = False
        db_table = 'AscentType'


class ClimbingDay(models.Model):
    id = models.BigAutoField(primary_key=True)
    date = models.DateField()
    user = models.ForeignKey(User, models.DO_NOTHING)
    comment = models.CharField(max_length=255, blank=True, null=True)
    crag = models.ForeignKey(Crag, models.DO_NOTHING)
    belayer = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'ClimbingDay'


class ClimbedRoute(models.Model):
    day = models.ForeignKey(ClimbingDay, models.DO_NOTHING, db_column='day_id', related_name='routes')
    id = models.AutoField(primary_key=True)
    route = models.ForeignKey(Route, models.DO_NOTHING, db_column='route_id')
    ascent_type = models.ForeignKey(AscentType, models.DO_NOTHING)
    comment = models.CharField(max_length=255, blank=True, null=True)
    belayer = models.CharField(max_length=100, blank=True, null=True)
    suggested_grade = models.CharField(max_length=10, blank=True, null=True)
    is_top_rope = models.BooleanField()

    class Meta:
        managed = False
        db_table = 'ClimbedRoute'
        unique_together = (('day_id', 'id'),)