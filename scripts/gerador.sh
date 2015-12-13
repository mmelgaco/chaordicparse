#!/bin/sh
LOOP_COUNT=100000
COUNT=0

while [ $COUNT -lt $LOOP_COUNT ]
do
   i=`shuf -i10-99 -n1`
   echo "177.126.180.83 - - ["$(date +"%d/%m/%Y %H:%M:%S")"] \"GET /meme.jpg HTTP/1.1\" 200 2148 \"-\" \"userid=$i\""
   COUNT=`expr $COUNT + 1`
done
