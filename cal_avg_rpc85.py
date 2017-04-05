from django.shortcuts import render, redirect
from django.core import serializers
from django.template import loader, Context
from django.http import JsonResponse
from netCDF4 import Dataset
from decimal import *

from climate.readNetcdf import ReedNCFile
from climate.r1 import Climdex

import csv
import json,time
import numpy as np
import datetime as dt
from climate.models import grid,future_rcp85,his_rcp85
import random, string, psycopg2,time

#--------------------------------------------------------------------------------------#


def calInsert(feature):
    sql1 ="""INSERT INTO all_avg_rcp85
          VALUES (%s, %s, %s, %s, %s, %s, %s, %s,
          %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
    try:
        conn=psycopg2.connect(database="dbclimate",user="postgres",password="198196",host="127.0.0.1", port="5432")
        cur = conn.cursor()
        eindex=["index_su","index_fd","index_id","index_tr","index_gsl","index_dtr","index_txx","index_tnx","index_txn",
    "index_tnn","index_rx1day","index_rx5day","index_sdii","index_r10mm","index_r20mm","index_rnnmm","index_cdd","index_cwd"]
            #print(fea['index_tnn'])
        for fea in feature:            
            cur.execute(sql1,(fea['avg_id'], fea[eindex[0]], fea[eindex[1]], fea[eindex[2]], fea[eindex[3]], fea[eindex[4]],
                                  fea[eindex[5]], fea[eindex[6]], fea[eindex[7]], fea[eindex[8]], fea[eindex[9]], fea[eindex[10]],
                                  fea[eindex[11]], fea[eindex[12]], fea[eindex[13]], fea[eindex[14]], fea[eindex[15]], fea[eindex[16]], fea[eindex[17]]))
            #print(ind)
            conn.commit() # commit 
        cur.close() # close communication with thte PostgreSQL database server
    except Exception as e:
        print ("I am unable to connect to the database.")

    finally:
        if conn is not None:
            conn.close()



start_time = time.time()
#cli2 = Indexs()
#su_data = cli2.su()
#print(su_data)

su = []
fd = []
ids = []
tr = []
gsl = []
dtr = []
txx = []
tnx = []
txn = []
tnn = []

rx1day = []
rx5day = []
sdii = []
r10mm = []
r20mm = []
rnnmm = []
cdd = []
cwd = []

cal_sum_su = []
cal_sum_fd = []
cal_sum_id = []
cal_sum_tr = []
cal_sum_gsl = []
cal_sum_dtr = []
cal_sum_txx = []
cal_sum_tnx = []
cal_sum_txn = []
cal_sum_tnn = []

cal_sum_rx1day = []
cal_sum_rx5day = []
cal_sum_sdii = []
cal_sum_r10mm = []
cal_sum_r20mm = []
cal_sum_rnnmm = []
cal_sum_cdd = []
cal_sum_cwd = []


data_su = []
data_fd = []
data_id= []
data_tr = []
data_gsl = []
data_dtr = []

data_txx = []
data_tnx = []
data_txn = []
data_tnn = []
data_rx1day = []
data_rx5day = []
data_sdii = []
data_r10mm = []
data_r20mm = []
data_rnnmm = []
data_cdd = []
data_cwd = []

num_point = 10
str_year = 1970

for i in range(0,36):
    cal_sum_su.append(0)
    cal_sum_fd.append(0)
    cal_sum_id.append(0)
    cal_sum_tr.append(0)
    cal_sum_gsl.append(0)
    cal_sum_dtr.append(0)
    cal_sum_txx.append(0)
    cal_sum_tnx.append(0)
    cal_sum_txn.append(0)
    cal_sum_tnn.append(0)
    cal_sum_rx1day.append(0)
    cal_sum_rx5day.append(0)
    cal_sum_sdii.append(0)
    cal_sum_r10mm.append(0)
    cal_sum_r20mm.append(0)
    cal_sum_rnnmm.append(0)
    cal_sum_cdd.append(0)
    cal_sum_cwd.append(0)

for x in range(1,num_point):# 48323
    grid_dat = his_rcp85.objects.get(id=x)
    su.append(grid_dat.index_su)
    fd.append(grid_dat.index_fd)
    ids.append(grid_dat.index_id)
    tr.append(grid_dat.index_tr)
    gsl.append(grid_dat.index_gsl)
    dtr.append(grid_dat.index_dtr)
    txx.append(grid_dat.index_txx)
    tnx.append(grid_dat.index_tnx)
    txn.append(grid_dat.index_txn)
    tnn.append(grid_dat.index_tnn)
    rx1day.append(grid_dat.index_rx1day)
    rx5day.append(grid_dat.index_rx5day)
    sdii.append(grid_dat.index_sdii)
    r10mm.append(grid_dat.index_r10mm)
    r20mm.append(grid_dat.index_r20mm)
    rnnmm.append(grid_dat.index_rnnmm)
    cdd.append(grid_dat.index_cdd)
    cwd.append(grid_dat.index_cwd)

    for x in range(0,len(grid_dat.index_su)):
        year = str(str_year+x)
        cal_sum_su[x] = cal_sum_su[x] + su[0][year]
        cal_sum_fd[x] = cal_sum_fd[x] + fd[0][year]
        cal_sum_id[x] = cal_sum_id[x] + ids[0][year]
        cal_sum_tr[x] = cal_sum_tr[x] + tr[0][year]
        cal_sum_gsl[x] = cal_sum_gsl[x] + gsl[0][year]
        cal_sum_dtr[x] = cal_sum_dtr[x] + dtr[0][year]
        cal_sum_txx[x] = cal_sum_txx[x] + txx[0][year]
        cal_sum_tnx[x] = cal_sum_tnx[x] + tnx[0][year]
        cal_sum_txn[x] = cal_sum_txn[x] + txn[0][year]
        cal_sum_tnn[x] = cal_sum_tnn[x] + tnn[0][year]
        cal_sum_rx1day[x] = cal_sum_rx1day[x] + rx1day[0][year]
        cal_sum_rx5day[x] = cal_sum_rx5day[x] + rx5day[0][year]
        cal_sum_sdii[x] = cal_sum_sdii[x] + sdii[0][year]
        cal_sum_r10mm[x] = cal_sum_r10mm[x] + r10mm[0][year]
        cal_sum_r20mm[x] = cal_sum_r20mm[x] + r20mm[0][year]
        cal_sum_rnnmm[x] = cal_sum_rnnmm[x] + rnnmm[0][year]
        cal_sum_cdd[x] = cal_sum_cdd[x] + cdd[0][year]
        cal_sum_cwd[x] = cal_sum_cwd[x] + cwd[0][year]


for i in range(0,len(cal_sum_su)):
    y = str(str_year+i)
    data_su.append([y,cal_sum_su[i]/num_point])
    data_fd.append([y,cal_sum_fd[i]/num_point])
    data_id.append([y,cal_sum_id[i]/num_point])
    data_tr.append([y,cal_sum_tr[i]/num_point])
    data_gsl.append([y,cal_sum_gsl[i]/num_point])
    data_dtr.append([y,cal_sum_dtr[i]/num_point])
    data_txx.append([y,cal_sum_txx[i]/num_point])
    data_tnx.append([y,cal_sum_tnx[i]/num_point])
    data_txn.append([y,cal_sum_txn[i]/num_point])
    data_tnn.append([y,cal_sum_tnn[i]/num_point])
    data_rx1day.append([y,cal_sum_rx1day[i]/num_point])
    data_rx5day.append([y,cal_sum_rx5day[i]/num_point])
    data_sdii.append([y,cal_sum_sdii[i]/num_point])
    data_r10mm.append([y,cal_sum_r10mm[i]/num_point])
    data_r20mm.append([y,cal_sum_r20mm[i]/num_point])
    data_rnnmm.append([y,cal_sum_rnnmm[i]/num_point])
    data_cdd.append([y,cal_sum_cdd[i]/num_point])
    data_cwd.append([y,cal_sum_cwd[i]/num_point])










cnt = 0
in_id = 1
feature = []
va={'avg_id':[],'index_su':{},'index_fd':{},'index_id':{},'index_tr':{},'index_gsl':{},'index_dtr':{},'index_txx':{},'index_tnx':{}
    ,'index_txn':{},'index_tnn':{},'index_rx1day':{},'index_rx5day':{},'index_sdii':{},'index_r10mm':{},'index_r20mm':{},'index_rnnmm':{},
    'index_cdd':{},'index_cwd':{}}

va['avg_id'] = 1
va['index_su'] = data_su
va['index_fd'] = data_fd
va['index_id'] = data_id

va['index_tr'] = data_tr
va['index_gsl'] = data_gsl
va['index_dtr'] = data_dtr

va['index_txx'] = data_txx
va['index_tnx'] = data_tnx
va['index_txn'] = data_txn
va['index_tnn'] = data_tnn

va['index_rx1day'] = data_rx1day
va['index_rx5day'] = data_rx5day
va['index_sdii'] = data_sdii
va['index_r10mm'] = data_r10mm
va['index_r20mm'] = data_r20mm
va['index_rnnmm'] = data_rnnmm
va['index_cdd'] = data_cdd
va['index_cwd'] = data_cwd

eindex=["index_su","index_fd","index_id","index_tr","index_gsl","index_dtr","index_txx","index_tnx","index_txn",
    "index_tnn","index_rx1day","index_rx5day","index_sdii","index_r10mm","index_r20mm","index_rnnmm","index_cdd","index_cwd"]
            #print(fea['index_tnn'])
for i in range(0,len(eindex)):
           va[eindex[i]] = json.dumps(va[eindex[i]])

feature.append(va)


#calInsert(feature)
#print(feature)


sql1 ="""INSERT INTO all_avg_rcp85
          VALUES (%s, %s, %s, %s, %s, %s, %s, %s,
          %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""

conn=psycopg2.connect(database="dbclimate",user="postgres",password="198196",host="127.0.0.1", port="5432")
cur = conn.cursor()

for fea in feature:            
    cur.execute(sql1,(fea['avg_id'], fea[eindex[0]], fea[eindex[1]], fea[eindex[2]], fea[eindex[3]], fea[eindex[4]],
    fea[eindex[5]], fea[eindex[6]], fea[eindex[7]], fea[eindex[8]], fea[eindex[9]], fea[eindex[10]],
    fea[eindex[11]], fea[eindex[12]], fea[eindex[13]], fea[eindex[14]], fea[eindex[15]], fea[eindex[16]], fea[eindex[17]]))
            #print(ind)
    conn.commit() # commit 
cur.close() # close communication with thte PostgreSQL database server
print('---%s seconds---'%(time.time()-start_time))





'''cal_sum_tr = []
cal_sum_gsl = []
cal_sum_dtr = []
cal_sum_txx = []
cal_sum_tnx = []
cal_sum_txn = []
cal_sum_tnn = []

cal_sum_rx1day = []
cal_sum_rx5day = []
cal_sum_sdii = []
cal_sum_r10mm = []
cal_sum_r20mm = []
cal_sum_rnnmm = []'''

'''va['index_tr'] = str(su_data)
va['index_gsl'] = str(su_data)
va['index_dtr'] = str(su_data)

va['index_txx'] = str(su_data)
va['index_tnx'] = str(su_data)
va['index_txn'] = str(su_data)
va['index_tnn'] = str(su_data)

va['index_rx1day'] = str(su_data)
va['index_rx5day'] = str(su_data)
va['index_sdii'] = str(su_data)
va['index_r10mm'] = str(su_data)
va['index_r20mm'] = str(su_data)
va['index_rnnmm'] = str(su_data)
va['index_cdd'] = str(su_data)
va['index_cwd'] = str(su_data)'''


'''va={'avg_id':[],'index_su':{},'index_fd':{},'index_id':{},'index_tr':{},'index_gsl':{},'index_dtr':{},'index_txx':{},'index_tnx':{}
    ,'index_txn':{},'index_tnn':{},'index_rx1day':{},'index_rx5day':{},'index_sdii':{},'index_r10mm':{},'index_r20mm':{},'index_rnnmm':{},
    'index_cdd':{},'index_cwd':{}}'''




'''a = np.array(cal_sum_su)
cal_sum_su = [float(Decimal("%.2f" % e)) for e in a]
b = np.array(cal_sum_fd)
cal_sum_fd = [float(Decimal("%.2f" % e)) for e in b]
c = np.array(cal_sum_id)
cal_sum_id = [float(Decimal("%.2f" % e)) for e in c]
d = np.array(cal_sum_tr)
cal_sum_tr = [float(Decimal("%.2f" % e)) for e in d]
f = np.array(cal_sum_gsl)
cal_sum_gsl = [float(Decimal("%.2f" % e)) for e in f]
g = np.array(cal_sum_dtr)
cal_sum_dtr = [float(Decimal("%.2f" % e)) for e in g]
h = np.array(cal_sum_txx)
cal_sum_txx = [float(Decimal("%.2f" % e)) for e in h]
i = np.array(cal_sum_tnx)
cal_sum_tnx = [float(Decimal("%.2f" % e)) for e in i]
j = np.array(cal_sum_txn)
cal_sum_txn = [float(Decimal("%.2f" % e)) for e in j]
k = np.array(cal_sum_tnn)
cal_sum_tnn = [float(Decimal("%.2f" % e)) for e in k]
l = np.array(cal_sum_rx1day)
cal_sum_rx1day = [float(Decimal("%.2f" % e)) for e in l]
m = np.array(cal_sum_rx5day)
cal_sum_rx5day = [float(Decimal("%.2f" % e)) for e in m]
n = np.array(cal_sum_sdii)
cal_sum_sdii = [float(Decimal("%.2f" % e)) for e in n]
o = np.array(cal_sum_r10mm)
cal_sum_sdii = [float(Decimal("%.2f" % e)) for e in o]
p = np.array(cal_sum_r20mm)
cal_sum_r20mm = [float(Decimal("%.2f" % e)) for e in p]
q = np.array(cal_sum_rnnmm)
cal_sum_rnnmm = [float(Decimal("%.2f" % e)) for e in q]
r = np.array(cal_sum_cdd)
cal_sum_cdd = [float(Decimal("%.2f" % e)) for e in r]
s = np.array(cal_sum_cwd)
cal_sum_cwd = [float(Decimal("%.2f" % e)) for e in s]'''