# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db.models import Q
from django.shortcuts import render

from domain.models import Domain


def index(request):
    query = request.GET.get('search')
    if query:
        listdomain = Domain.objects.filter(Q(name_domain__icontains=query))
    else:
        listdomain = Domain.objects.all()

    return render(request, 'base.html', {'listdomain':listdomain})

