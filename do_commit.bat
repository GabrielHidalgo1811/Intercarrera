@echo off
git add -A
git commit -m "Fix goles faltantes Kine: Cerda +1, Castaneda +1, Mahan +1"
git push origin main
del "%~f0"
