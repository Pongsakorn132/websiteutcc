#!/bin/sh
# ----------------------------------------------------------------------------
# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
#
#      https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# ----------------------------------------------------------------------------

# ----------------------------------------------------------------------------
# Maven Wrapper Bootstrap Script
# ----------------------------------------------------------------------------

set -euf
IFS=$(printf '\n\t')

BASE_DIR=$(dirname "$0")
MAVEN_PROJECT_DIR="${BASE_DIR}"

MAVEN_WRAPPER_JAR="${MAVEN_PROJECT_DIR}/.mvn/wrapper/maven-wrapper.jar"
MAVEN_WRAPPER_PROPERTIES="${MAVEN_PROJECT_DIR}/.mvn/wrapper/maven-wrapper.properties"

if [ ! -f "${MAVEN_WRAPPER_PROPERTIES}" ]; then
  echo "Missing ${MAVEN_WRAPPER_PROPERTIES}"
  exit 1
fi

if [ ! -f "${MAVEN_WRAPPER_JAR}" ]; then
  echo "Downloading Maven Wrapper..."
  WRAPPER_URL="https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.2.0/maven-wrapper-3.2.0.jar"
  mkdir -p "${MAVEN_PROJECT_DIR}/.mvn/wrapper"
  if command -v curl >/dev/null 2>&1; then
    curl -fsSL -o "${MAVEN_WRAPPER_JAR}" "${WRAPPER_URL}"
  elif command -v wget >/dev/null 2>&1; then
    wget -q -O "${MAVEN_WRAPPER_JAR}" "${WRAPPER_URL}"
  else
    echo "Neither curl nor wget is available to download the wrapper."
    exit 1
  fi
fi

JAVA_CMD="${JAVA_HOME:-}/bin/java"
if [ ! -x "${JAVA_CMD}" ]; then
  JAVA_CMD="java"
fi

exec "${JAVA_CMD}" \
  -Dmaven.multiModuleProjectDirectory="${MAVEN_PROJECT_DIR}" \
  -classpath "${MAVEN_WRAPPER_JAR}" \
  org.apache.maven.wrapper.MavenWrapperMain "$@"
