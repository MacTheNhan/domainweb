# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models


class VarCharField(models.CharField):
    description = "Unlimited-length string"

    def __init__(self, *args, **kwargs):
        kwargs['max_length'] = int(1e9)
        super(models.CharField, self).__init__(*args, **kwargs)

    def get_internal_type(self):
        return 'VarCharField'

    def db_type(self, connection):
        return 'varchar'

    def formfield(self, **kwargs):
        return super(models.CharField, self).formfield(**kwargs)


# Create your models here.
class Domain(models.Model):
    name_domain = VarCharField()
    status = models.BooleanField(default=False)
    description_domain = VarCharField()
    price = models.FloatField(blank=True, null=True)

    def __str__(self):
        return self.name_domain

    class Meta:
        db_table = 'Domain'