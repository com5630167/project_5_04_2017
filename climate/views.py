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
from climate.models import grid,future_rcp85,his_rcp85,cal_maxmin,avg_rcp85


class Indexs(object):
    """docstring for Indexs"""
    def __init__(self):
        super(Indexs, self).__init__()
        self.num_point = 5
        self.str_year = 1970

    '''def su(self):
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
        return data_p'''
    def max1(self):
        grid_dat = cal_maxmin.objects.get(id=1)
        return grid_dat.ts_max
    def min1(self):
        grid_dat = cal_maxmin.objects.get(id=1)
        return grid_dat.ts_min
    def avg1(self):
        grid_dat = cal_maxmin.objects.get(id=1)
        return grid_dat.ts_avg

    def max2(self):
        grid_dat = cal_maxmin.objects.get(id=1)
        return grid_dat.pr_max
    def min2(self):
        grid_dat = cal_maxmin.objects.get(id=1)
        return grid_dat.pr_min
    def avg2(self):
        grid_dat = cal_maxmin.objects.get(id=1)
        return grid_dat.pr_avg


    def su1(self):
        grid_dat = avg_rcp85.objects.get(id=1)
        su = grid_dat.index_su    
        return su
    '''def su(self):
        grid_dat = his_rcp85.objects.get(id=1)
        su = []
        su.append(grid_dat.index_su)
        data_p = []
        for x in range(self.str_year,self.str_year+len(grid_dat.index_su)):
            data_p.append([str(x),su[0][str(x)]])
        return data_p'''

    def fd1(self):
        grid_dat = avg_rcp85.objects.get(id=1)
        return grid_dat.index_fd

    def id1(self): 
        grid_dat = avg_rcp85.objects.get(id=1)
        return grid_dat.index_id

    def tr1(self): 
        grid_dat = avg_rcp85.objects.get(id=1)
        return grid_dat.index_tr

    def gsl1(self):
        grid_dat = avg_rcp85.objects.get(id=1)
        return grid_dat.index_gsl
        

    def dtr1(self):
        grid_dat = avg_rcp85.objects.get(id=1)
        return grid_dat.index_dtr

    def txx1(self):
        grid_dat = avg_rcp85.objects.get(id=1)
        return grid_dat.index_txx

    def tnx1(self):
        grid_dat = avg_rcp85.objects.get(id=1)
        return grid_dat.index_tnx

    def txn1(self):
        grid_dat = avg_rcp85.objects.get(id=1)
        return grid_dat.index_txn

    def tnn1(self):
        grid_dat = avg_rcp85.objects.get(id=1)
        return grid_dat.index_tnn

    def rx1day2(self):
        grid_dat = avg_rcp85.objects.get(id=1)
        return grid_dat.index_rx1day

    def rx5day2(self):
        grid_dat = avg_rcp85.objects.get(id=1)
        return grid_dat.index_rx5day

    def sdii2(self):
        grid_dat = avg_rcp85.objects.get(id=1)
        return grid_dat.index_sdii

    def r10mm2(self):
        grid_dat = avg_rcp85.objects.get(id=1)
        return grid_dat.index_r10mm

    def r20mm2(self):
        grid_dat = avg_rcp85.objects.get(id=1)
        return grid_dat.index_r20mm

    def rnnmm2(self):
        grid_dat = avg_rcp85.objects.get(id=1)
        return grid_dat.index_rnnmm

    def cdd2(self):
        grid_dat = avg_rcp85.objects.get(id=1)
        return grid_dat.index_cdd

    def cwd2(self):
        grid_dat = avg_rcp85.objects.get(id=1)
        return grid_dat.index_cwd

def map(request):
    readNetcdf = ReedNCFile()
    lon = readNetcdf.lon_data(1)
    lat = readNetcdf.lat_data(1)
    return render(request, 'mapVitual.html')#, {'lon':json.dumps(lat)})

def data_ltln(request):
    readNetcdf = ReedNCFile()
    lon = readNetcdf.lon_data(1)
    lat = readNetcdf.lat_data(1)
    asl = json.dumps(lat)
    #print(readNetcdf.lon_data(1))
    #lat = readNetcdf.lat_data(1)
	#return redirect('vitual')#, {'lat':json.dumps(lat)})
    return JsonResponse(lat, safe=False)

def home_page(request):
    cli = Climdex("/home/thiranan/Project2/ec45indcal.csv")
    
    cli2 = Indexs()
    max_data = cli2.max1()
    aa = getattr(cli2, "su1")()
    #print(aa)
    grid_dat = avg_rcp85.objects.get(id=1)
    sus = grid_dat.index_su
    print(type(sus))
    print(type(aa))
    #print(data_p)
    #cal[x] =cal[x]+su[0][str(2006+x)]
    grid_dat2 = his_rcp85.objects.get(id=1)
    ids = []
    ids.append(grid_dat2.index_id)
    print(type(ids))
            
    '''su = []
    data_p = []
    cal_sum = []
    num_point = 10
    str_year = 1970
    for i in range(0,36):
        cal_sum.append(0)
    for x in range(1,num_point):# 48323
        grid_dat = his_rcp85.objects.get(id=x)
        su.append(grid_dat.index_su)
        for x in range(0,len(grid_dat.index_su)):
            cal_sum[x] = cal_sum[x] + su[0][str(str_year+x)]
    for i in range(0,len(cal_sum)):
        data_p.append([str(str_year+i),cal_sum[i]/num_point])'''
    

    if request.method == 'POST':
        #POST goes here . is_ajax is must to capture ajax requests. Beginner's pit.
        txx_data = cli.txx()
        if request.is_ajax():
            #Always use get on request.POST. Correct way of querying a QueryDict.
            path_file = request.POST.get('path_file')
            #print(path_file)
            
            data = {"path_file":getattr(cli2, path_file)()}    
            #Returning same data back to browser.It is not possible with Normal submit
            print(path_file)
            print(data)
            return JsonResponse(data)
    return render(request, 'map_graph.html',{'Max_ts':json.dumps(max_data)})

def conctrat_page(request):
    cli = Climdex("/home/thiranan/Project2/ec85indcal.csv")
    if request.method == 'POST':
        #POST goes here . is_ajax is must to capture ajax requests. Beginner's pit.
        txx_data = cli.txx()
        if request.is_ajax():
            #Always use get on request.POST. Correct way of querying a QueryDict.
            path_file = request.POST.get('path_file')
            #print(path_file)
           
            data = {"path_file":getattr(cli, path_file)()}    
            #Returning same data back to browser.It is not possible with Normal submit
            return JsonResponse(data)
    return render(request, 'map_Contrast.html')





'''def list_check():
    grid_dat = future_rcp85.objects.get(id=1)
    list_str = grid_dat.__dict__.keys()
    some_list = ['abc-123', 'def-456', 'ghi-789', 'abc-456']
    keys = 0
    matching = [s for s in list_str if "su" in s]

    #aa = list_str.index(matching)
    aa = 0
    for i in [i for i,x in enumerate(list_str) if x == 1]:
        aa = i
        
    return enumerate(list_str)'''

'''    
    fd = grid_dat.index_fd
    ids  = grid_dat.index_id
    tr = grid_dat.index_tr
    gsl = grid_dat.index_gsl
    dtr = grid_dat.index_dtr
    txx = grid_dat.index_txx
    tnx = grid_dat.index_tnx
    txn = grid_dat.index_txn
    tnn = grid_dat.index_tnn
    rx1day = grid_dat.index_rx1day
    rx5day = grid_dat.index_rx5day
    sdii = grid_dat.index_sdii
    r10mm  = grid_dat.index_r10mm
    r20mm = grid_dat.index_r20mm
    rnnmm = grid_dat.index_rnnmm
    cdd = grid_dat.index_cdd
    cwd = grid_dat.index_cwd'''


'''def data_mange(index):
    s = '';
    seq = ("index_", index);
    s = s.join(seq)
    #print(s)
    

    su = []
    data_p = []
    #print(dir(grid_dat))
    #print(getattr(grid_dat))
    print(list_check())



    su.append(grid_dat.s)

    print(su[0][str(2007)])
    print()

    for x in range(2006,2006+len(grid_dat.index_su)):
        data_p.append([str(x),su[0][str(x)]])
    print(data_p)

    return s '''