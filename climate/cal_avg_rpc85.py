from django.shortcuts import render, redirect
from django.core import serializers
from django.template import loader, Context
from django.http import JsonResponse
from netCDF4 import Dataset
from decimal import *

from climate.readNetcdf import ReedNCFile
from climate.r1 import Climdex

import csv
import json
import numpy as np
import datetime as dt
from climate.models import grid,future_rcp85,his_rcp85


class Indexs(object):
    """docstring for Indexs"""
    def __init__(self):
        super(Indexs, self).__init__()
        self.num_point = 5
        self.str_year = 1970

    def su(self):
        su = []
        data_p = []
        cal_sum = []
        for i in range(0,36):
            cal_sum.append(0)
        for x in range(1,self.num_point):# 48323
            grid_dat = his_rcp85.objects.get(id=x)
            su.append(grid_dat.index_su)
            for x in range(0,len(grid_dat.index_su)):
                cal_sum[x] = cal_sum[x] + su[0][str(self.str_year+x)]
        for i in range(0,len(cal_sum)):
            data_p.append([str(self.str_year+i),cal_sum[i]/self.num_point])
        return data_p

    '''def su(self):
        grid_dat = his_rcp85.objects.get(id=1)
        su = []
        su.append(grid_dat.index_su)
        data_p = []
        for x in range(self.str_year,self.str_year+len(grid_dat.index_su)):
            data_p.append([str(x),su[0][str(x)]])
        return data_p'''

    def fd(self):
        grid_dat = his_rcp85.objects.get(id=1)
        fd = []
        fd.append(grid_dat.index_fd)
        data_p = []
        for x in range(self.str_year,self.str_year+len(grid_dat.index_fd)):
            data_p.append([str(x),fd[0][str(x)]])
        return data_p

    def id(self): 
        grid_dat = his_rcp85.objects.get(id=1)
        ids = []
        ids.append(grid_dat.index_id)
        data_p = []
        for x in range(self.str_year,self.str_year+len(grid_dat.index_id)):
            data_p.append([str(x),ids[0][str(x)]])
        return data_p

    def tr(self): 
        grid_dat = his_rcp85.objects.get(id=1)
        tr = []
        tr.append(grid_dat.index_tr)
        data_p = []
        for x in range(self.str_year,self.str_year+len(grid_dat.index_tr)):
            data_p.append([str(x),tr[0][str(x)]])
        return data_p

    def gsl(self):
        grid_dat = his_rcp85.objects.get(id=1)
        gsl = []
        gsl.append(grid_dat.index_gsl)
        data_p = []
        for x in range(self.str_year,self.str_year+len(grid_dat.index_gsl)):
            data_p.append([str(x),gsl[0][str(x)]])
        return data_p
        

    def dtr(self):
        grid_dat = his_rcp85.objects.get(id=1)
        dtr = []
        dtr.append(grid_dat.index_dtr)
        data_p = []
        for x in range(self.str_year,self.str_year+len(grid_dat.index_dtr)):
            data_p.append([str(x),dtr[0][str(x)]])
        return data_p

    def txx(self):
        grid_dat = his_rcp85.objects.get(id=1)
        txx = []
        txx.append(grid_dat.index_txx)
        data_p = []
        for x in range(self.str_year,self.str_year+len(grid_dat.index_txx)):
            data_p.append([str(x),txx[0][str(x)]])
        return data_p

    def tnx(self):
        grid_dat = his_rcp85.objects.get(id=1)
        tnx = []
        tnx.append(grid_dat.index_tnx)
        data_p = []
        for x in range(self.str_year,self.str_year+len(grid_dat.index_tnx)):
            data_p.append([str(x),tnx[0][str(x)]])
        return data_p

    def txn(self):
        grid_dat = his_rcp85.objects.get(id=1)
        txn = []
        txn.append(grid_dat.index_txn)
        data_p = []
        for x in range(self.str_year,self.str_year+len(grid_dat.index_txn)):
            data_p.append([str(x),txn[0][str(x)]])
        return data_p

    def tnn(self):
        grid_dat = his_rcp85.objects.get(id=1)
        tnn = []
        tnn.append(grid_dat.index_tnn)
        data_p = []
        for x in range(self.str_year,self.str_year+len(grid_dat.index_tnn)):
            data_p.append([str(x),tnn[0][str(x)]])
        return data_p

    def rx1day(self):
        grid_dat = his_rcp85.objects.get(id=1)
        rx1day = []
        rx1day.append(grid_dat.index_rx1day)
        data_p = []
        for x in range(self.str_year,self.str_year+len(grid_dat.index_rx1day)):
            data_p.append([str(x),rx1day[0][str(x)]])
        return data_p

    def rx5day(self):
        grid_dat = his_rcp85.objects.get(id=1)
        rx5day = []
        rx5day.append(grid_dat.index_rx5day)
        data_p = []
        for x in range(self.str_year,self.str_year+len(grid_dat.index_rx5day)):
            data_p.append([str(x),rx5day[0][str(x)]])
        return data_p

    def sdii(self):
        grid_dat = his_rcp85.objects.get(id=1)
        sdii = []
        sdii.append(grid_dat.index_sdii)
        data_p = []
        for x in range(self.str_year,self.str_year+len(grid_dat.index_sdii)):
            data_p.append([str(x),sdii[0][str(x)]])
        return data_p

    def r10mm(self):
        grid_dat = his_rcp85.objects.get(id=1)
        r10mm = []
        r10mm.append(grid_dat.index_r10mm)
        data_p = []
        for x in range(self.str_year,self.str_year+len(grid_dat.index_r10mm)):
            data_p.append([str(x),r10mm[0][str(x)]])
        return data_p

    def r20mm(self):
        grid_dat = his_rcp85.objects.get(id=1)
        r20mm = []
        r20mm.append(grid_dat.index_r20mm)
        data_p = []
        for x in range(self.str_year,self.str_year+len(grid_dat.index_r20mm)):
            data_p.append([str(x),r20mm[0][str(x)]])
        return data_p

    def rnnmm(self):
        grid_dat = his_rcp85.objects.get(id=1)
        rnnmm = []
        rnnmm.append(grid_dat.index_rnnmm)
        data_p = []
        for x in range(self.str_year,self.str_year+len(grid_dat.index_rnnmm)):
            data_p.append([str(x),rnnmm[0][str(x)]])
        return data_p

    def cdd(self):
        grid_dat = his_rcp85.objects.get(id=1)
        cdd = []
        cdd.append(grid_dat.index_cdd)
        data_p = []
        for x in range(self.str_year,self.str_year+len(grid_dat.index_cdd)):
            data_p.append([str(x),cdd[0][str(x)]])
        return data_p

    def cwd(self):
        grid_dat = his_rcp85.objects.get(id=1)
        cwd = []
        cwd.append(grid_dat.index_cwd)
        data_p = []
        for x in range(self.str_year,self.str_year+len(grid_dat.index_cwd)):
            data_p.append([str(x),cwd[0][str(x)]])
        return data_p

cli2 = Indexs()
su_data = cli2.su()
print(su_data)