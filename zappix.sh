#!/bin/bash

URL="http://localhost:3080/api/message"
PHONE="$1"
TITULO="$2"
MESSAGE="$TITULO $3"  # Ajuste para concatenar corretamente título e mensagem

# Ajuste da manipulação do sed

MESSAGE=$(echo -n "$MESSAGE")

# Enviando Mensagem
curl -v  -X POST -d "number=$PHONE&message=$MESSAGE" "$URL"
