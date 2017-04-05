from django.db import models
from django.contrib.postgres.fields import JSONField

# ---------------------------------------------#
# ----------------- Table 1 -------------------#
class grid(models.Model):
    id = models.IntegerField(db_column='grid_id',primary_key=True)
    point = JSONField()
    coordinates = JSONField()
    class Meta:
        db_table = 'climate_grid'

# ---------------------------------------------#
# ----------------- Table 2 -------------------#
class future_rcp85(models.Model):
    id = models.IntegerField(db_column='grid_id',primary_key=True)
    index_su = JSONField()
    index_fd = JSONField()
    index_id = JSONField()
    index_tr = JSONField()
    index_gsl = JSONField()
    index_dtr = JSONField()
    index_txx = JSONField()
    index_tnx = JSONField()
    index_txn = JSONField()
    index_tnn = JSONField()
    index_rx1day = JSONField()
    index_rx5day = JSONField()
    index_sdii = JSONField()
    index_r10mm = JSONField()
    index_r20mm = JSONField()
    index_rnnmm = JSONField()
    index_cdd = JSONField()
    index_cwd = JSONField()
    class Meta:
        db_table = 'climate_future_rpc85'

# ---------------------------------------------#
# ----------------- Table 3 -------------------#
class future_rcp45(models.Model):
    id = models.IntegerField(db_column='grid_id',primary_key=True)
    index_su = JSONField()
    index_fd = JSONField()
    index_id = JSONField()
    index_tr = JSONField()
    index_gsl = JSONField()
    index_dtr = JSONField()
    index_txx = JSONField()
    index_tnx = JSONField()
    index_txn = JSONField()
    index_tnn = JSONField()
    index_rx1day = JSONField()
    index_rx5day = JSONField()
    index_sdii = JSONField()
    index_r10mm = JSONField()
    index_r20mm = JSONField()
    index_rnnmm = JSONField()
    index_cdd = JSONField()
    index_cwd = JSONField()
    class Meta:
        db_table = 'climate_future_rpc45'

# ---------------------------------------------#
# ----------------- Table 4 -------------------#
class historical(models.Model):
    id = models.IntegerField(db_column='grid_id',primary_key=True)
    index_su = JSONField()
    index_fd = JSONField()
    index_id = JSONField()
    index_tr = JSONField()
    index_gsl = JSONField()
    index_dtr = JSONField()
    index_txx = JSONField()
    index_tnx = JSONField()
    index_txn = JSONField()
    index_tnn = JSONField()
    index_rx1day = JSONField()
    index_rx5day = JSONField()
    index_sdii = JSONField()
    index_r10mm = JSONField()
    index_r20mm = JSONField()
    index_rnnmm = JSONField()
    index_cdd = JSONField()
    index_cwd = JSONField()
    class Meta:
        db_table = 'climate_historical'

# ---------------------------------------------#
# ----------------- Table 5 -------------------#
class hist_rpc85(models.Model):
    id = models.IntegerField(db_column='grid_id',primary_key=True)
    index_wsdi = JSONField()
    index_csdi = JSONField()
    index_tn10p = JSONField()
    index_tx10p = JSONField()
    index_tn90p = JSONField()
    index_tx90p = JSONField()
    index_r95ptot = JSONField()
    index_r99ptot = JSONField()
    index_prctot = JSONField()
    class Meta:
        db_table = 'climate_hist_rpc85'

# ---------------------------------------------#
# ----------------- Table 6 -------------------#
class hist_rpc45(models.Model):
    id = models.IntegerField(db_column='grid_id',primary_key=True)
    index_wsdi = JSONField()
    index_csdi = JSONField()
    index_tn10p = JSONField()
    index_tx10p = JSONField()
    index_tn90p = JSONField()
    index_tx90p = JSONField()
    index_r95ptot = JSONField()
    index_r99ptot = JSONField()
    index_prctot = JSONField()
    class Meta:
        db_table = 'climate_hist_rpc45'

# ---------------------------------------------#
# ----------------- Table 7 -------------------#
class measure_temp(models.Model):
    id = models.IntegerField(db_column='grid_id',primary_key=True)
    ms_avg = JSONField()
    ms_max = JSONField()
    ms_min = JSONField()
    class Meta:
        db_table = 'climate_measure_temp'

# ---------------------------------------------#
# ----------------- Table 8 -------------------#
class measure_prec(models.Model):
    id = models.IntegerField(db_column='grid_id',primary_key=True)
    ms_avg = JSONField()
    ms_max = JSONField()
    ms_min = JSONField()
    class Meta:
        db_table = 'climate_measure_prec'



#-----------------Average Future RPC85---------#
class avg_rcp85(models.Model):
    id = models.IntegerField(db_column='avg_id',primary_key=True)
    index_su = JSONField()
    index_fd = JSONField()
    index_id = JSONField()
    index_tr = JSONField()
    index_gsl = JSONField()
    index_dtr = JSONField()
    index_txx = JSONField()
    index_tnx = JSONField()
    index_txn = JSONField()
    index_tnn = JSONField()
    index_rx1day = JSONField()
    index_rx5day = JSONField()
    index_sdii = JSONField()
    index_r10mm = JSONField()
    index_r20mm = JSONField()
    index_rnnmm = JSONField()
    index_cdd = JSONField()
    index_cwd = JSONField()
    class Meta:
        db_table = 'all_avg_rcp85'


#-----------------histrorical --------------------#
class his_rcp85(models.Model):
    id = models.IntegerField(db_column='grid_id',primary_key=True)
    index_su = JSONField()
    index_fd = JSONField()
    index_id = JSONField()
    index_tr = JSONField()
    index_gsl = JSONField()
    index_dtr = JSONField()
    index_txx = JSONField()
    index_tnx = JSONField()
    index_txn = JSONField()
    index_tnn = JSONField()
    index_rx1day = JSONField()
    index_rx5day = JSONField()
    index_sdii = JSONField()
    index_r10mm = JSONField()
    index_r20mm = JSONField()
    index_rnnmm = JSONField()
    index_cdd = JSONField()
    index_cwd = JSONField()
    class Meta:
        db_table = 't04historical'

class cal_maxmin(models.Model):
    id = models.IntegerField(db_column='cal_id',primary_key=True)
    pr_avg = JSONField()
    pr_max = JSONField()
    pr_min = JSONField()
    ts_avg = JSONField()
    ts_max = JSONField()
    ts_min = JSONField()
    class Meta:
        db_table = 'cal_rcp85'
