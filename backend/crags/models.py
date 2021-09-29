from django.db import models


# Create your models here.
class Crag(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=70)
    last_updated = models.DateTimeField(blank=True, null=True)
    url = models.CharField(max_length=200, blank=True, null=True)
    id_country = models.IntegerField()
    num_of_routes = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        managed = False
        db_table = 'Crag'
        ordering = ['name']


class Sector(models.Model):
    id = models.AutoField(primary_key=True)
    crag = models.ForeignKey(Crag, models.DO_NOTHING, db_column='id_of_crag', related_name='sectors')
    name = models.CharField(max_length=70)

    def __str__(self):
        return self.name

    class Meta:
        managed = False
        db_table = 'Sector'


class Route(models.Model):
    id = models.AutoField(primary_key=True)
    sector = models.ForeignKey('Sector', models.DO_NOTHING, db_column='id_of_sector', related_name='routes')
    name = models.CharField(max_length=100)
    grade = models.CharField(max_length=70, blank=True, null=True)
    length = models.IntegerField(blank=True, null=True)
    consecutive_num = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return str(self.name) + "(" + str(self.grade) + ")"

    class Meta:
        managed = False
        db_table = 'Route'
        ordering = ['consecutive_num']
        

class Country(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)
    slovenian_name = models.CharField(max_length=100)
    code = models.CharField(unique=True, max_length=2)

    def __str__(self):
        return str(self.name)

    class Meta:
        managed = False
        db_table = 'Country'
